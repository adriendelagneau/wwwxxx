import { HomeIcon } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Link href={"/"}>
        <button className="text-secondary hover:text-primary absolute top-10 left-10 cursor-pointer text-lg transition-colors">
          Retour <HomeIcon className="ml-2 inline" size={18} />
        </button>
      </Link>
      <div className="flex items-center">
        <span className="font-poppins text-secondary text-6xl sm:text-8xl xl:text-9xl">
          4
        </span>

        <span className="relative mx-2 flex aspect-square w-12 items-center justify-center sm:w-18 xl:w-24">
          <span className="text-primary text-6xl sm:text-8xl xl:text-9xl">
            0
          </span>
        </span>

        <span className="font-poppins text-secondary text-6xl sm:text-8xl xl:text-9xl">
          4
        </span>
      </div>

      <p className="font-poppins text-secondary text-3xl sm:text-5xl xl:text-6xl">
        Page non trouvée...
      </p>
      <p className="text-secondary/70 mt-4">
        La page que vous recherchez n'existe pas.
      </p>
    </div>
  );
};

export default NotFound;
