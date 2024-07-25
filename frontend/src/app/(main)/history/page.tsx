"use client"

import History from "./Component/CustomerComponent/History";
import DriverHistory from "./Component/DriverComponent/History";

export default function page() {
  return (
    <div className="mx-auto min-h-screen w-full">
      <div className="container mx-auto">
        <History />
        <DriverHistory />
      </div>
    </div>
  );
}
