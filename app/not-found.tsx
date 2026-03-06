import { ArrowLeft, HomeIcon } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="relative z-5 flex h-screen w-full flex-col items-center justify-center gap-4 font-poppins px-3">
      <Link href={"/"}>
        <button className="text-secondary  absolute top-6 left-4 flex cursor-pointer items-center gap-1 text-lg transition-colors">
          <ArrowLeft className="ml-2 inline" size={18} strokeWidth={2.5} /> <span>Retour</span>
        </button>
      </Link>
      <div className="text-secondary flex gap-2 text-6xl sm:text-8xl xl:text-9xl">
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </div>

      <p className="text-secondary text-3xl sm:text-5xl xl:text-6xl">
        Page non trouvée...
      </p>
      <p className="text-secondary/70 mt-4 text-lg ">
        La page que vous recherchez n'existe pas.
      </p>
    </div>
  );
};

export default NotFound;
