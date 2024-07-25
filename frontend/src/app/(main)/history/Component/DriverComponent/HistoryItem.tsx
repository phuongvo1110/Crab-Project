"use client";

import GoogleMap from "@app/(main)/customer/Components/GoogleMap";

export default function HistoryItem(props: any) {
  const {
    departure,
    destination,
    date,
    vehicle,
    price,
    pickUpLngLat,
    destinationLngLat,
  } = props;

  const handleBooking = () => {
    alert("Đặt lại");
  };

  return (
    <div className="history-item mx-auto flex h-fit w-[360px] flex-col rounded-xl border p-4 shadow-lg xl:w-[320px] lg:h-auto lg:w-full lg:flex-row">
      <div className="h-full w-full text-left lg:pl-[10px]">
        <div className="mainInfo flex justify-between gap-4 text-justify md:text-left">
          <span className="line-clamp-2">Go to {destination}</span>
          <div className="h-fit rounded-full border bg-foreground p-2 text-background">
            <span>${price}</span>
          </div>
        </div>
        <div className="ml-auto w-full pt-2">
          <span>{date}</span>
        </div>
        <div className="mb-auto w-full pt-2">
          <button
            className="z-30 font-medium text-[#3ECF8E]"
            onClick={handleBooking}
          >
            -&gt; Re-order
          </button>
        </div>
        <div className="map mt-4 h-[200px] w-auto lg:hidden">
          <GoogleMap
            isSearch={false}
            initialFirstPlace={pickUpLngLat}
            initialSecondPlace={destinationLngLat}
          />
        </div>
      </div>
    </div>
  );
}
