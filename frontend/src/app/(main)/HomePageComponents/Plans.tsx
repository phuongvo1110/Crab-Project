import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Plans() {
  return (
    <div className="z-0 flex w-full flex-row justify-center gap-4 xl:-mt-6 xl:flex-col xl:items-center xl:gap-7">
      <div className="flex h-fit w-80 flex-col items-center overflow-hidden rounded-md shadow-[rgba(216,215,215,1)_0px_0px_5px_5px] xl:w-[90%]">
        <div className="flex h-10 w-full items-center justify-center bg-gradient-to-r from-[#028037] to-[#f3ec69] font-medium text-white">
          <span className="w-fit text-background">CRAB BIKE</span>
        </div>
        <div className="-mt-2 flex h-fit w-full flex-col items-center rounded-md bg-white">
          <div className="mx-auto mt-6 w-fit rounded-full bg-[#9BA5C5] px-6 text-white">
            Popular selection
          </div>
          <h2 className="mx-auto my-4 text-3xl font-medium text-[#028037]">
            Comfort
          </h2>
          <hr className="w-full border-t border-foreground/50"></hr>
          <div className="flex h-12 w-52 flex-row items-center gap-3">
            <div>
              <Image
                alt="Tick"
                src="/assets/images/home/blue-tick.png"
                width={15}
                height={15}
              />
            </div>
            <span>Safe and fast</span>
          </div>
          <hr className="w-full border-t border-foreground/50"></hr>
          <div className="flex h-12 w-52 flex-row items-center gap-3">
            <div>
              <Image
                alt="Tick"
                src="/assets/images/home/blue-tick.png"
                width={15}
                height={15}
              />
            </div>
            <p>How a polite driver</p>
          </div>
          <hr className="w-full border-t border-foreground/50"></hr>
          <div className="flex h-12 w-52 flex-row items-center gap-3">
            <div>
              <Image
                alt="Tick"
                src="/assets/images/home/blue-tick.png"
                width={15}
                height={15}
              />
            </div>
            <p>Compete price in market</p>
          </div>
          <hr className="w-full border-t border-foreground/50"></hr>
          <div className="flex h-12 w-52 flex-row items-center gap-3">
            <div>
              <Image
                alt="Tick"
                src="/assets/images/home/blue-tick.png"
                width={15}
                height={15}
              />
            </div>
            <p>Multiple payments</p>
          </div>
        </div>
        <div className="flex h-fit w-full flex-col gap-2 bg-[#028037] p-3 pt-6">
          <div className="mb-3 w-full gap-1 text-center text-[54px] font-bold text-background">
            $0.5/km
          </div>
          <Button className="rounded bg-background font-light hover:bg-white">
            Book bike now
          </Button>
          <Button
            variant="ghost"
            className="rounded bg-none font-light text-background hover:bg-[#028037]"
          >
            Just incease $0.2/km for the next km
          </Button>
        </div>
      </div>
      <div className="flex h-fit w-80 flex-col items-center overflow-hidden rounded-md shadow-[rgba(216,215,215,1)_0px_0px_5px_5px] xl:w-[90%]">
        <div className="flex h-10 w-full items-center justify-center bg-gradient-to-r from-[#028037] to-[#f3ec69] font-medium text-white">
          <span className="w-fit text-background">CRAB CAR</span>
        </div>
        <div className="-mt-2 flex h-fit w-full flex-col items-center rounded-md bg-white">
          <div className="mx-auto mt-6 w-fit rounded-full bg-[#9BA5C5] px-6 text-white">
            Luxury selection
          </div>
          <h2 className="mx-auto my-4 text-3xl font-medium text-[#028037]">
            Ultra experience
          </h2>
          <hr className="w-full border-t border-foreground/50"></hr>
          <div className="flex h-12 w-52 flex-row items-center gap-3">
            <div>
              <Image
                alt="Tick"
                src="/assets/images/home/blue-tick.png"
                width={15}
                height={15}
              />
            </div>
            <span>How a fast trip</span>
          </div>
          <hr className="w-full border-t border-foreground/50"></hr>
          <div className="flex h-12 w-52 flex-row items-center gap-3">
            <div>
              <Image
                alt="Tick"
                src="/assets/images/home/blue-tick.png"
                width={15}
                height={15}
              />
            </div>
            <p>How a polite driver</p>
          </div>
          <hr className="w-full border-t border-foreground/50"></hr>
          <div className="flex h-12 w-52 flex-row items-center gap-3">
            <div>
              <Image
                alt="Tick"
                src="/assets/images/home/blue-tick.png"
                width={15}
                height={15}
              />
            </div>
            <p>Variety transportations</p>
          </div>
          <hr className="w-full border-t border-foreground/50"></hr>
          <div className="flex h-12 w-52 flex-row items-center gap-3">
            <div>
              <Image
                alt="Tick"
                src="/assets/images/home/blue-tick.png"
                width={15}
                height={15}
              />
            </div>
            <p>Green gas transport</p>
          </div>
        </div>
        <div className="flex h-fit w-full flex-col gap-2 bg-[#028037] p-3 pt-6">
          <div className="mb-3 w-full gap-1 text-center text-[54px] font-bold text-background">
            $1.59/km
          </div>
          <Button className="rounded bg-background font-light hover:bg-white">
            Book car now
          </Button>
          <Button
            variant="ghost"
            className="rounded bg-none font-light text-background hover:bg-[#028037]"
          >
            Just incease $0.49/km for the next km
          </Button>
        </div>
      </div>
    </div>
  );
}
