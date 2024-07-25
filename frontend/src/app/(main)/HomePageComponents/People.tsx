import Image from "next/image";

export default function People() {
  return (
    <div className="mx-auto grid w-fit grid-cols-3 gap-3 xl:w-full xl:grid-cols-1 xl:gap-24">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="relative h-44 w-60 rounded-xl bg-accent shadow-[rgba(216,215,215,1)_0px_0px_10px_5px] xl:mx-auto xl:w-[80%]"
        >
          <div className="absolute -top-10 left-[50%] translate-x-[-50%]">
            <Image
              alt="People 1"
              src="/assets/images/home/p1.png"
              width={100}
              height={100}
              className="overflow-hidden rounded-full"
            />
          </div>
          <div className="mt-16 flex w-full flex-row justify-center gap-1.5">
            {Array.from({ length: 5 }, (_, index) => (
              <Image
                key={index}
                alt="Star"
                src="/assets/images/home/star.png"
                width={38}
                height={38}
              />
            ))}
          </div>
          <div className="absolute -bottom-5 right-7 z-10 flex h-fit w-full flex-col justify-between rounded-br-xl rounded-tl-xl bg-accent py-4 text-[14px] font-light italic shadow-[rgba(216,215,215,1)_0px_4px_10px_2px]">
            <p className="px-2 text-center">
              Fantastic experience! This ride-hailing app has completely changed
              the way I travel.
            </p>
            <p className="text-center">
              <span className="font-semibold">Mr. Sang Le</span>, CARB's golden
              customer.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
