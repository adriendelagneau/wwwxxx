"use client";

import { useAnimationStore } from "@/store/useAnimationStore";
import { useBubbleStore } from "@/store/useBubbleStore";
import { useMenuStore } from "@/store/useMenuStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BubblesIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import React, { useRef, useEffect } from "react";

const Header = () => {
  const togglePlay = useBubbleStore((state) => state.togglePlay);
  const startBubbles = useBubbleStore((state) => state.setPlaying);

  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);
  const openMenu = useMenuStore((state) => state.openMenu);
  const setAnimating = useMenuStore((s) => s.setAnimating);

  const createIntroTimeline = useAnimationStore(
    (state) => state.createIntroTimeline
  );
  const getIntroTimeline = useAnimationStore((state) => state.getIntroTimeline);
  const introPlayed = useAnimationStore((state) => state.introPlayed);

  const navbarRef = useRef<HTMLElement>(null);
  const lastScrollTop = useRef(0);

  /* ================= INTRO TIMELINE ================= */
  useGSAP(() => {
    if (!navbarRef.current) return;

    // Get or create the master timeline
    let tl = getIntroTimeline();
    if (!tl) {
      tl = createIntroTimeline();
    }

    if (introPlayed) {
      // If already played, show navbar immediately
      gsap.set(navbarRef.current, { y: 0, opacity: 1 });
      startBubbles(true);
      return;
    }

    // Add navbar animation to the master timeline
    tl.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      2.4 // start after text animation
    );

    // Add bubbles start at the end of navbar animation
    tl.add(() => {
      startBubbles(true);
    }, 2.7); // adjust to sync with navbar
  }, [introPlayed]);

  /* ================= SCROLL SHOW / HIDE ================= */
  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY;
      if (!navbarRef.current) return;

      if (st > lastScrollTop.current && st > 100) {
        // scrolling down → hide
        gsap.to(navbarRef.current, {
          y: -100,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        // scrolling up → show
        gsap.to(navbarRef.current, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      lastScrollTop.current = st <= 0 ? 0 : st;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="bg-primary text-secondary font-poppins fixed top-0 left-0 z-50 flex h-20 w-full -translate-y-full justify-between p-3 md:p-4"
    >
      {/* LEFT */}
      <div className="flex items-center font-bold uppercase sm:text-xl">
        {/* Mobile Hamburger */}
        <div
          className="relative flex h-6 w-6 cursor-pointer flex-col items-center justify-center lg:hidden"
          onClick={() => openMenu()}
        >
          <MenuIcon size={28} className="text-secondary" />
        </div>

        {/* Desktop Nav */}
        <ul className=" hidden gap-3 text-xl font-bold uppercase lg:flex">
          <li
            className="underline-effect cursor-pointer"
            onClick={() => {
              if (!isMenuOpen) {
                openMenu();
                setAnimating(false);
              }
            }}
          >
            produits
          </li>
        </ul>
      </div>

      {/* CENTER */}
      <div className="font-cream-cake absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-4xl capitalize sm:text-5xl md:text-6xl">
        <Link href={"/"}>Breizh Cola</Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end">
        <div className="flex cursor-pointer items-center text-xl font-bold uppercase">
          <BubblesIcon
            size={28}
            onClick={togglePlay}
            className="text-secondary lg:hidden"
          />
          <div
            className="ml-2 hidden cursor-pointer transition-transform duration-150 active:scale-95 lg:inline-block"
            onClick={togglePlay}
          >
            bulles
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
