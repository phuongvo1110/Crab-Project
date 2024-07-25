"use client";

import { MapProvider } from "@/app/(main)/customer/providers/map-provider";
import { MapComponent } from "./map";

export default function GoogleMap(props: any) {
  const { isSearch, initialFirstPlace, initialSecondPlace, isDriver } = props;

  return (
    <MapProvider>
      <MapComponent
        isSearch={isSearch}
        isDriver={isDriver}
        initialFirstPlace={initialFirstPlace}
        initialSecondPlace={initialSecondPlace}
      />
    </MapProvider>
  );
}
