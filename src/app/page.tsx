import HomeBtn from "@/components/HomeBtn";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
  return (
    <div>
      <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] antialiased bg-grid-black/[0.2] relative flex items-center justify-center">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#fefae0"
        />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex flex-col z-20">
          <div className="mx-auto blue_bg inline-block py-1 px-4 rounded-full">
            Welcome to the Smart Quizzer 🥳
          </div>
          <h2 className="my-2 sm:my-2 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold leading-[1.15]">
            Elevate Your Quiz <br className="max-md:hidden" />{" "}
            <span className="blue_gradient">Experience with AI</span>
          </h2>
          <div className="mx-auto mt-5 flex gap-5">
            <HomeBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
