"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Matter from "matter-js";

const MatterMarquee: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canRef = useRef<HTMLDivElement>(null);
  const buttonLeftRef = useRef<HTMLButtonElement>(null);
  const buttonRightRef = useRef<HTMLButtonElement>(null);

  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const wallRefsRef = useRef<Matter.Body[]>([]);
  const canBodyRef = useRef<Matter.Body | null>(null);
  const buttonBodiesRef = useRef<Matter.Body[]>([]);
  const firingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFiringRef = useRef(false);

  const [loaded, setLoaded] = useState(false);

  const sponsorImages = [
    "/sponsorts/music/t1.png",
    "/sponsorts/music/t2.png",
    "/sponsorts/music/t3.png",
    "/sponsorts/music/t4.png",
    "/sponsorts/music/t5.png",
    "/sponsorts/music/t6.png",
    "/sponsorts/music/t7.png",
    "/sponsorts/music/t8.png",
  ];

  const originalImageSize = 200;

  // 1. PRELOAD ALL ASSETS (Sponsors + Can) with error handling and timeout
  useEffect(() => {
    const assets = [...sponsorImages, "/can2.png"];
    let loadedCount = 0;
    let mounted = true;

    // Fallback timeout in case images fail to load
    const timeout = setTimeout(() => {
      if (mounted) {
        console.warn("Image loading timeout - proceeding anyway");
        setLoaded(true);
      }
    }, 5000);

    const promises = assets.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loadedCount++;
            if (mounted && loadedCount === assets.length) {
              clearTimeout(timeout);
              setLoaded(true);
            }
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${src}`);
            loadedCount++;
            if (mounted && loadedCount === assets.length) {
              clearTimeout(timeout);
              setLoaded(true);
            }
            resolve();
          };
        })
    );

    Promise.all(promises);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, []);

  // 2. FIRE CANNON LOGIC with proper interval management
  const fireCannon = useCallback(() => {
    if (
      isFiringRef.current ||
      !engineRef.current ||
      !sceneRef.current ||
      !canRef.current ||
      !loaded
    )
      return;

    isFiringRef.current = true;

    const engine = engineRef.current;
    const scene = sceneRef.current;
    const can = canRef.current;

    const rect = can.getBoundingClientRect();
    const sceneRect = scene.getBoundingClientRect();

    const baseX = rect.left - sceneRect.left + rect.width / 2;
    const baseY = rect.top - sceneRect.top + 10; // Offset slightly from the top of the can

    const total = 8;
    const spreadDeg = 25;
    const baseAngleDeg = -90;
    const speedFactor = Math.min(scene.offsetWidth, scene.offsetHeight) * 0.012;
    const radius = Math.min(scene.offsetWidth, scene.offsetHeight) * 0.045;

    let count = 0;

    firingIntervalRef.current = setInterval(() => {
      if (count >= total) {
        if (firingIntervalRef.current) {
          clearInterval(firingIntervalRef.current);
          firingIntervalRef.current = null;
        }
        isFiringRef.current = false;
        return;
      }

      const angleDeg =
        baseAngleDeg + (Math.random() * spreadDeg * 2 - spreadDeg);
      const angleRad = (angleDeg * Math.PI) / 180;

      const velocity = {
        x: Math.cos(angleRad) * speedFactor,
        y: Math.sin(angleRad) * speedFactor,
      };

      const image =
        sponsorImages[Math.floor(Math.random() * sponsorImages.length)];

      const circle = Matter.Bodies.circle(baseX, baseY, radius, {
        restitution: 0.8,
        frictionAir: 0.03,
        density: 0.01,
        render: {
          sprite: {
            texture: image,
            xScale: (radius * 2) / originalImageSize,
            yScale: (radius * 2) / originalImageSize,
          },
        },
      });

      Matter.Body.setVelocity(circle, velocity);
      Matter.Body.setAngularVelocity(circle, (Math.random() - 0.5) * 0.3);
      Matter.World.add(engine.world, circle);

      // Limit active bodies to prevent performance degradation
      const maxBodies = 50;
      if (engine.world.bodies.length > maxBodies) {
        // Remove oldest dynamic bodies (keep walls and static objects)
        const dynamicBodies = engine.world.bodies.filter(
          (body) => !body.isStatic
        );
        const bodiesToRemove = dynamicBodies.slice(
          0,
          engine.world.bodies.length - maxBodies
        );
        Matter.World.remove(engine.world, bodiesToRemove);
      }

      count++;
    }, 60);
  }, [loaded]);

  // 3. INIT MATTER ENGINE
  useEffect(() => {
    if (!loaded) return;

    const initMatter = () => {
      // Use requestAnimationFrame to ensure the DOM has painted the can image size
      window.requestAnimationFrame(() => {
        const scene = sceneRef.current;
        const can = canRef.current;
        const btnLeft = buttonLeftRef.current;
        const btnRight = buttonRightRef.current;

        if (!scene || !can) return;

        const width = scene.offsetWidth;
        const height = scene.offsetHeight;
        const sceneRect = scene.getBoundingClientRect();

        // CLEANUP
        if (engineRef.current) {
          Matter.Render.stop(renderRef.current!);
          Matter.Runner.stop(runnerRef.current!);
          Matter.World.clear(engineRef.current.world, false);
          Matter.Engine.clear(engineRef.current);
          renderRef.current?.canvas.remove();
        }

        const engine = Matter.Engine.create();
        // Reduce physics iterations for better performance
        engine.positionIterations = 4;
        engine.velocityIterations = 3;
        engine.gravity.y = 1.5;
        engineRef.current = engine;

        const render = Matter.Render.create({
          element: scene,
          engine,
          options: {
            width,
            height,
            wireframes: false,
            background: "transparent",
          },
        });

        renderRef.current = render;
        Matter.Render.run(render);

        const runner = Matter.Runner.create();
        runnerRef.current = runner;
        Matter.Runner.run(runner, engine);

        // WALLS
        const wallOptions = { isStatic: true, render: { visible: false } };
        const walls = [
          Matter.Bodies.rectangle(
            width / 2,
            height + 25,
            width,
            50,
            wallOptions
          ), // Floor
          Matter.Bodies.rectangle(-25, height / 2, 50, height, wallOptions), // Left
          Matter.Bodies.rectangle(
            width + 25,
            height / 2,
            50,
            height,
            wallOptions
          ), // Right
          Matter.Bodies.rectangle(width / 2, -1000, width, 50, wallOptions), // High Ceiling
        ];
        wallRefsRef.current = walls;
        Matter.World.add(engine.world, walls);

        // CAN COLLIDER - Ensure rect is caught after image is loaded
        const rectCan = can.getBoundingClientRect();
        if (rectCan.width > 0) {
          const canBody = Matter.Bodies.rectangle(
            rectCan.left - sceneRect.left + rectCan.width / 2,
            rectCan.top - sceneRect.top + rectCan.height / 2,
            rectCan.width,
            rectCan.height,
            { isStatic: true, render: { visible: false } }
          );
          canBodyRef.current = canBody;
          Matter.World.add(engine.world, canBody);
        }

        // BUTTON COLLIDERS
        const buttonBodies: Matter.Body[] = [];
        [btnLeft, btnRight].forEach((btn) => {
          if (!btn) return;
          const rect = btn.getBoundingClientRect();
          const body = Matter.Bodies.rectangle(
            rect.left - sceneRect.left + rect.width / 2,
            rect.top - sceneRect.top + rect.height / 2,
            rect.width,
            rect.height,
            { isStatic: true, render: { visible: false } }
          );
          buttonBodies.push(body);
        });
        buttonBodiesRef.current = buttonBodies;
        Matter.World.add(engine.world, buttonBodies);
      });
    };

    initMatter();

    // OPTIMIZED: Debounced resize handler - only update canvas size, don't recreate engine
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (
          !sceneRef.current ||
          !engineRef.current ||
          !renderRef.current ||
          !wallRefsRef.current.length
        )
          return;

        const width = sceneRef.current.offsetWidth;
        const height = sceneRef.current.offsetHeight;
        const sceneRect = sceneRef.current.getBoundingClientRect();

        // Update canvas dimensions
        renderRef.current.canvas.width = width;
        renderRef.current.canvas.height = height;
        renderRef.current.options.width = width;
        renderRef.current.options.height = height;

        // Update wall positions
        if (wallRefsRef.current.length === 4) {
          Matter.Body.setPosition(wallRefsRef.current[0], {
            x: width / 2,
            y: height + 25,
          }); // Floor
          Matter.Body.setPosition(wallRefsRef.current[1], {
            x: -25,
            y: height / 2,
          }); // Left
          Matter.Body.setPosition(wallRefsRef.current[2], {
            x: width + 25,
            y: height / 2,
          }); // Right
          Matter.Body.setPosition(wallRefsRef.current[3], {
            x: width / 2,
            y: -1000,
          }); // Ceiling
        }

        // Update can body position if it exists
        if (canBodyRef.current && canRef.current) {
          const rectCan = canRef.current.getBoundingClientRect();
          Matter.Body.setPosition(canBodyRef.current, {
            x: rectCan.left - sceneRect.left + rectCan.width / 2,
            y: rectCan.top - sceneRect.top + rectCan.height / 2,
          });
        }
      }, 250); // 250ms debounce
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (sceneRef.current) resizeObserver.observe(sceneRef.current);

    return () => {
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      if (firingIntervalRef.current) {
        clearInterval(firingIntervalRef.current);
      }
      if (engineRef.current) {
        Matter.Render.stop(renderRef.current!);
        Matter.Runner.stop(runnerRef.current!);
        renderRef.current?.canvas.remove();
      }
    };
  }, [loaded, fireCannon]);

  return (
    <div className="relative z-999 flex h-[120vh] w-full justify-center overflow-hidden bg-transparent">
      {/* BUTTON LEFT */}
      <button
        ref={buttonLeftRef}
        disabled={!loaded}
        className={`text-secondary bg-primary font-poppins border-secondary absolute top-[40%] left-[10%] z-50 skew-x-3 rounded-md border-2 p-6 text-2xl font-semibold uppercase transition-opacity xl:left-[15%] ${!loaded ? "opacity-50" : "opacity-100"}`}
        onClick={fireCannon}
      >
        {loaded ? "Open can" : "Loading..."}
      </button>

      {/* BUTTON RIGHT */}
      <button
        ref={buttonRightRef}
        disabled={!loaded}
        className={`text-secondary bg-primary font-poppins border-secondary absolute top-[40%] right-[10%] z-50 -skew-x-3 rounded-md border-2 p-6 text-2xl font-semibold uppercase transition-opacity xl:right-[15%] ${!loaded ? "opacity-50" : "opacity-100"}`}
        onClick={fireCannon}
      >
        {loaded ? "Open can" : "Loading..."}
      </button>

      {/* MATTER SCENE */}
      <div
        ref={sceneRef}
        className="pointer-events-none absolute inset-0 z-10"
      />

      {/* VISUAL CAN */}
      <div
        ref={canRef}
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 -translate-x-1/2 transform"
      >
        <img
          src="/can2.png"
          className="block w-40 xl:w-64"
          alt="can"
          onLoad={() => {
            // Backup trigger to ensure layout if browser cache was weird
            if (loaded) {
              /* initMatter already handles dependencies */
            }
          }}
        />
      </div>
    </div>
  );
};

export default MatterMarquee;
