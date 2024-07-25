"use client";

import { useState, useRef, useEffect } from "react";
import BookingForm from "@app/(main)/customer//Components/BookingForm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CustomerHP from "@/../public/assets/CustomerHP.png";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export default function page() {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleButtonClick = () => {
    setShowBookingForm(true);
  };

  const bookingFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showBookingForm && bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showBookingForm]);

  return (
    <div className="mx-auto min-h-screen w-screen px-[50px] lg:px-6 sm:px-4">
      <div className="mx-auto my-auto grid h-screen w-full grid-cols-[4fr_6fr] gap-4 lg:flex lg:h-full lg:flex-col lg:pt-6">
        <div className="mb-[50px] flex h-full w-full flex-col items-center justify-center lg:mb-[0]">
          <span className="text-[48px] font-bold text-[#2078AE] lg:text-center sm:text-[32px]">
            Welcome to Crab Service
          </span>
          <span className="text-[36px] font-semibold lg:text-center sm:text-[26px]">
            Crab your ride, and let the journey begin!
          </span>
          <Button
            className="mt-1 bg-background text-lg text-[#3ECF8E] hover:text-accent"
            onClick={handleButtonClick}
          >
            {"-> Take your ride"}
          </Button>
        </div>
        <div className="flex h-full w-full items-center justify-between">
          <Image src={CustomerHP} alt="HomePage" />
        </div>
      </div>

      {showBookingForm && (
        <div
          className="container mx-auto py-[20px]"
          id="booking-form"
          ref={bookingFormRef}
        >
          <div className="grid grid-cols-2 rounded-lg bg-background shadow-[rgba(216,215,215,1)_0px_0px_10px_5px] lg:grid-cols-1">
            <div className="p-8">
              <BookingForm />
            </div>
            <div className="flex w-full flex-col rounded-r-lg bg-foreground p-8 text-background dark:bg-background dark:text-foreground lg:hidden">
              <h5 className="mx-auto mb-3 mt-2 text-3xl font-bold">
                Contact Crab
              </h5>
              <div className="flex items-start">
                <Phone />
                <div className="ml-3 mr-10 flex flex-1 flex-col border-b border-background/50 pb-[20px] dark:border-foreground/50">
                  <span className="mb-2 block">Hotline</span>
                  <span className="font-bold">1900 1088</span>
                </div>
              </div>
              <div className="mt-[20px] flex items-start">
                <Mail />
                <div className="ml-3 mr-10 flex flex-1 flex-col border-b border-background/50 pb-[20px] dark:border-foreground/50">
                  <span className="mb-2 block">Email</span>
                  <span className="font-bold">cskh@crab.vn</span>
                </div>
              </div>
              <div className="mt-[20px] flex items-start">
                <MapPin />
                <div className="ml-3 mr-10 flex flex-1 flex-col border-b border-background/50 pb-[20px] dark:border-foreground/50">
                  <span className="mb-2 block">Address</span>
                  <span className="font-bold">
                    227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM
                  </span>
                </div>
              </div>
              <h5 className="mb-3 mt-2 text-3xl font-bold">Social</h5>
              <div className="mb-2 flex">
                <Facebook className="mr-2 h-[40px] w-[40px] rounded-full border-2 p-1" />
                <Instagram className="mr-2 h-[40px] w-[40px] rounded-full border-2 p-1" />
                <Twitter className="mr-2 h-[40px] w-[40px] rounded-full border-2 p-1" />
                <Youtube className="mr-2 h-[40px] w-[40px] rounded-full border-2 p-1" />
              </div>
              <div className="relative h-[320px] pt-2 lg:h-[276px]">
                <img
                  className="h-full w-full object-cover"
                  src="https://jtexpress.vn/themes/jtexpress/assets/images/mapininfo.png"
                  alt="Liên hệ với chúng tôi"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
