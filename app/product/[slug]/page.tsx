import Carousel from "./components/carousel/Carousel";
import HeroSingle from "./components/HeroSingle";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const slug = (await params).slug as
    | "original"
    | "cherry"
    | "zero"
    | "lime"
    | "coffee";

  return (
    <div className="relative z-5 pt-24">
      <HeroSingle variant={slug} />
      <Carousel />
    </div>
  );
};

export default Page;
