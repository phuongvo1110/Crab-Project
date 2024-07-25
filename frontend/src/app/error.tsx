"use client";

import { useRouter } from "next/navigation";
import { Button } from "@components/ui/button";

function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  const handleClick = async () => {
    reset();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[700px] sm:w-[90%] h-fit px-12 py-8 bg-foreground/10 shadow rounded-xl flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-4 text-primary font-bold">
          Next.js Application
        </h1>
        <h2 className="text-center mb-4 text-red-400">
          We notice that: {error.message}
        </h2>
        <div className="flex flex-row gap-4 mt-2">
          <Button
            className="text-accent bgbackgournd rounded-lg"
            onClick={handleClick}
          >
            Try again
          </Button>
          <Button
            className="text-accent bgbackgournd rounded-lg"
            onClick={router.back}
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Error;
