import Header from "@components/Layout/Header/Header";
import Footer from "@components/Layout/Footer/Footer";
import Template from "@app/(main)/template";
import Image from "next/image";
import People from "@app/(main)/HomePageComponents/People";
import Plans from "@app/(main)/HomePageComponents/Plans";
import Logos from "@app/(main)/HomePageComponents/Logos";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <Header />
      <Template>
        <main className="animate-in">
          <div className="-z-10 flex h-auto w-full max-w-[1600px] flex-col overflow-hidden bg-background">
            <div className="relative text-white sm:h-fit">
              <div className="bg-white/30 absolute left-0 top-0 h-full w-full backdrop-brightness-[0.4]"></div>
              <div className="absolute left-28 top-[20%] h-fit xl:!bottom-6 xl:left-6 sm:left-4">
                <h1 className="text-6xl font-bold leading-tight text-background dark:text-foreground xl:text-4xl">
                  Your <span className="text-[#028037]">Ride</span>, Your{" "}
                  <span className="text-[#028037]">Way:</span> <br></br>{" "}
                  <span className="text-[#028037]">Experience</span> the
                  Convenience <br></br>
                  with Crab
                </h1>
                <p className="mb-7 mr-4 mt-3 font-light text-background dark:text-foreground xl:mb-4 xl:mt-1 sm:text-sm">
                  Welcome to our ground-breaking ride-hailing service, Crab,
                  where comfort<br></br> and safety are combined with
                  convenience.{" "}
                </p>
                <Link
                  href="/customer"
                  className="w-fit rounded-xl bg-background text-base text-[#028037] hover:bg-background"
                >
                  {"-> Take your ride"}
                </Link>
              </div>
              <div className="">
                <Image
                  alt="Main"
                  src="/assets/images/home/driver-taxi-1.jpg"
                  width={1600}
                  height={1000}
                  className="xl:h-[500px] xl:object-cover"
                />
              </div>
            </div>
            <div className="relative mb-16 mt-12 flex h-fit w-full flex-col items-center gap-10">
              <h1 className="text-4xl font-bold text-[#028037] sm:text-3xl">
                Our points
              </h1>
              <div className="absolute -right-3 -top-6">
                <Image
                  alt="Decor"
                  src="/assets/images/home/bg-decor.png"
                  width={175}
                  height={175}
                />
              </div>
              <div className="absolute -left-12 -top-12 -rotate-[60deg]">
                <Image
                  alt="Decor"
                  src="/assets/images/home/bg-decor.png"
                  width={175}
                  height={175}
                />
              </div>
              <Logos />
            </div>
            <div className="flex flex-row xl:flex-col">
              <div className="w-1/2 xl:w-full">
                <Image
                  alt="Consult"
                  src="/assets/images/home/driver-taxi-2.jpg"
                  width={1500}
                  height={600}
                  quality={100}
                />
              </div>
              <div className="flex w-1/2 flex-col justify-center gap-6 bg-foreground/10 p-6 text-foreground xl:w-full xl:px-6 xl:pb-12 xl:pt-10 sm:px-4">
                <h2 className="text-4xl font-semibold text-[#028037]">
                  Your ride, your way <br></br> – it's just a tap away!
                </h2>
                <p className="font-light">
                  Welcome to Crab, where personalized transportation meets ease
                  of use. With our easy-to-use app, you take control of your
                  travel. Enter your destination, select the car type of your
                  choice, and let us take care of the rest. Every journey with
                  Crab is customized to meet your preferences, guaranteeing a
                  smooth and pleasurable experience each and every time.
                </p>
              </div>
            </div>
            <div className="relative flex flex-col items-center gap-12 py-6">
              <div className="absolute -top-28 z-0 h-fit pt-2 text-[380px] font-extrabold tracking-[2rem] text-foreground/5">
                CRAB
              </div>
              <div className="absolute left-24 top-2 -rotate-[60deg]">
                <Image
                  alt="Decor"
                  src="/assets/images/home/bg-decor.png"
                  width={145}
                  height={145}
                />
              </div>
              <h1 className="z-10 my-6 text-4xl font-bold text-[#028037] sm:text-3xl">
                Our customers
              </h1>
              <People />
            </div>
            <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-16 pb-12 pt-16 xl:w-full sm:pb-6">
              <div className="absolute left-4 top-16">
                <Image
                  alt="Decor"
                  src="/assets/images/home/bg-decor.png"
                  width={150}
                  height={150}
                />
              </div>
              <div className="absolute right-0 top-5">
                <Image
                  alt="Decor"
                  src="/assets/images/home/bg-decor.png"
                  width={150}
                  height={150}
                />
              </div>
              <div className="absolute -top-24 left-[50%] -z-10 h-fit translate-x-[-50%] text-[370px] font-extrabold text-[#F0EFEF]">
                IT
              </div>
              <h1 className="text-4xl font-bold text-[#028037] sm:text-3xl">
                Flexible Selection
              </h1>
              <Plans />
            </div>
            <div className="flex w-full flex-row justify-center gap-28 text-[#898989] xl:gap-10 sm:flex-col sm:items-center">
              <div className="flex flex-row items-center gap-1 font-light">
                <div className="mb-0.5">
                  <Image
                    alt="Date"
                    src="/assets/images/home/i1.png"
                    width={15}
                    height={15}
                  />
                </div>
                <span className="text-sm">Unlimited Free Trial</span>
              </div>
              <div className="flex flex-row items-center gap-1 font-light">
                <div>
                  <Image
                    alt="Date"
                    src="/assets/images/home/i2.png"
                    width={15}
                    height={15}
                  />
                </div>
                <span className="text-sm">No Hidden Fees</span>
              </div>
              <div className="flex flex-row items-center gap-1 font-light">
                <div>
                  <Image
                    alt="Date"
                    src="/assets/images/home/i3.png"
                    width={15}
                    height={15}
                  />
                </div>
                <span className="text-sm">Free to cancel anytime</span>
              </div>
            </div>
            <hr className="mx-auto my-10 w-72 border-[0.5px] border-foreground/50"></hr>
          </div>
        </main>
      </Template>
      <Footer />
    </>
  );
}
