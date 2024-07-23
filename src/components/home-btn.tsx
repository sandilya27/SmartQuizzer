"use client";

import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useRouter } from "next/navigation";
import { RxGithubLogo } from "react-icons/rx";

const HomeBtn = () => {
  const router = useRouter();
  return (
    <>
      <HoverBorderGradient
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        onClick={() => router.push("/auth/login")}
      >
        <span>Get Started</span>
      </HoverBorderGradient>
      <Button
        onClick={() =>
          window.open("https://github.com/sandilya27/smart_quizzer", "_blank")
        }
      >
        <RxGithubLogo className="mr-2 h-4 w-4" />
        Github
      </Button>
    </>
  );
};

export default HomeBtn;
