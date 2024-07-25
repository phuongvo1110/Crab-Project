"use client";

import ItemDialog from "./ItemDialog";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useUserSessionStore, { UserSessionStore } from "@/zustand/useSession";

export default function History() {
  const { userSession } = useUserSessionStore() as UserSessionStore;

  const {
    data: data,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["Driver"],
    queryFn: async () =>
      axios
        .get(
          process.env.NEXT_PUBLIC_BACKEND_API_URL +
            "/DriverBooking/GetByCustId?custId=" +
            userSession.id
        )
        .then((res) => res),
  });

  useEffect(() => {
    console.log(userSession);
  }, []);

  console.log(data);

  return (
    <div className="mx-auto w-full py-[20px] sm:px-[20px]">
      {isSuccess && userSession.rolePermission === 0 ? (
        <>
          <div className="mx-auto w-fit text-3xl font-bold">
            BOOKING HISTORY
          </div>
          {data.data[0] ? (
            <div className="history-list grid w-full grid-cols-3 items-center justify-center gap-[40px] py-4 lg:grid-cols-1 lg:gap-4">
              {data?.data.map((item: any, index: any) => (
                <ItemDialog key={index} {...item} isLoading={isLoading} />
              ))}
            </div>
          ) : (
            <div className="mt-56 w-full text-center font-medium">
              You do not have any trip before.
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
