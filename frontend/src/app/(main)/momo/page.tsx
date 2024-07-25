import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-4 px-3 py-4 animate-in">
      <h1 className="my-2 text-3xl font-semibold text-[#A40063]">
        Momo said that: Payment Unsuccessful!
      </h1>
      <div className="mx-auto flex w-fit flex-col items-center overflow-hidden rounded-lg border sm:w-full">
        <Image alt="Momo" src="/assets/momo.png" width={400} height={300} />
        <div className="my-3 flex w-full flex-col items-center gap-2 px-3">
          <Link
            href="/customer"
            className="flex h-10 w-full items-center justify-center rounded-lg border hover:text-[#A40063]"
          >
            <span>Back to Customer</span>
          </Link>
          <Link
            href="/"
            className="flex h-10 w-full items-center justify-center rounded-lg border bg-foreground text-background"
          >
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
