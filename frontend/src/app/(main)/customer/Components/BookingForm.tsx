"use client";

import GoogleMap from "@app/(main)/customer/Components/GoogleMap";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormVehicleType from "@components/Picker/VehicleType/FormVehicleType";
import SelectVehicle from "./SelectVehicle";
import useBookingForm, { useBookingFormState } from "@/zustand/useBookingForm";
import useUserSessionStore, { UserSessionStore } from "@/zustand/useSession";

export default function BookingForm() {
  const { setName, setPhone } = useBookingForm() as useBookingFormState;
  const { userSession } = useUserSessionStore() as UserSessionStore;

  const FormSchema = z.object({
    name: z.string().min(2, {
      message: "At least 2 characters.",
    }),
    phone: z.string().min(10, {
      message: "Verify your phone number.",
    }),
    vehicle: z.string(),
    location: z.object({
      start: z.object({
        lat: z.string(),
        lng: z.string(),
      }),
      end: z.object({
        lat: z.string(),
        lng: z.string(),
      }),
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: "",
      phone: "",
      location: {
        start: { lat: "", lng: "" },
        end: { lat: "", lng: "" },
      },
    },
    mode: "onChange",
  });

  useEffect(() => {
    setName(form.getValues("name"));
    setPhone(form.getValues("phone"));
  }, [form.getValues("name"), form.getValues("phone")]);

  // async function onSubmit(data: z.infer<typeof FormSchema>) {
  //   toast.promise(async () => {}, {
  //     loading: "Booking...",
  //     success: () => {
  //       form.reset();
  //       return "Booked successfully!";
  //     },
  //     error: (error: any) => {
  //       return error.message;
  //     },
  //   });
  // }

  return (
    <div className="flex flex-col gap-2">
      <div className="mx-auto w-fit text-3xl font-bold text-foreground">
        BOOKING FORM
      </div>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    {...field}
                    type="text"
                    onChange={field.onChange}
                    value={userSession.name || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone Number"
                    {...field}
                    type="phone"
                    onChange={field.onChange}
                    value={userSession.phoneNumber || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="vehicle"
            render={() => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <FormControl>
                  <FormVehicleType />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div className="h-[340px] w-full lg:h-[240px]">
                    <GoogleMap isSearch={true} {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="!mt-[150px] flex w-full flex-row gap-3">
        <Button
          disabled={!form.formState.isValid}
          className="mt-1 w-full bg-foreground px-0 text-background hover:bg-foreground"
        >
          <SelectVehicle />
        </Button>
      </div>
    </div>
  );
}
