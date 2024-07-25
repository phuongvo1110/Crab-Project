"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@components/ui/textarea";
import FormVehicleType from "@components/Picker/VehicleType/FormVehicleType";
import useBookingForm, { useBookingFormState } from "@/zustand/useBookingForm";
import useGoogleMap from "@/zustand/useGoogleMap";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Location } from "@/utils/type";
import stickJWTToHeader from "@/utils/functions/stickJWTToHeader";

const FormSchema = z.object({
  customerName: z.string().min(2, "Name is compulsory."),
  customerPhone: z
    .string()
    .min(6)
    .max(12)
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Enter a valid phone number.",
    }),
  customerNote: z.string().nullable(),
  price: z.number().nullable(),
});

export default function CreateForm() {
  const router = useRouter();
  const { bookingForm } = useBookingForm() as useBookingFormState;
  const { googleMap } = useGoogleMap();
  var location1: Location, location2: Location;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerNote: "",
      price: 0,
    },
  });

  const bookingDriverMutation = useMutation({
    mutationFn: (data) =>
      axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + "/DriverBooking",
        data,
        stickJWTToHeader()
      ),
    onSuccess: (data) => {
      console.log("booking", data);
    },
    onError: (error) => {
      console.log("booking", error);
    },
    retry: 3,
  });

  const addLocationMutation = useMutation({
    mutationFn: (data: Location) =>
      axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + "/Location",
        data,
        stickJWTToHeader()
      ),
    retry: 3,
  });

  const addCustomer = useMutation({
    mutationFn: (data: any) =>
      axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + "/Customer",
        data,
        stickJWTToHeader()
      ),
    onSuccess: (data) => {
      console.log(data);
    },
    retry: 3,
  });

  const handleLocation = () => {
    const pickUp = bookingForm.pickUp.split(",");
    const dropOff = bookingForm.dropOff.split(",");

    location1 = {
      id: "",
      longtitude: googleMap.pickUpPlace?.lng as number,
      latitude: googleMap.pickUpPlace?.lat as number,
      destination: bookingForm.pickUp,
      city: pickUp[4],
      country: pickUp[3],
      district: pickUp[2],
      street: pickUp[0],
    };

    location2 = {
      id: "",
      longtitude: googleMap.dropOffPlace?.lng as number,
      latitude: googleMap.dropOffPlace?.lat as number,
      destination: bookingForm.dropOff,
      city: dropOff[4],
      country: dropOff[3],
      district: dropOff[2],
      street: dropOff[0],
    };
  };

  const checkLocation = async () => {
    let res1, res2;
    handleLocation();
    await axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
          "/Location/GetLocationByLatLong?longtitude=" +
          location1.longtitude.toString() +
          "&latitude=" +
          location1.latitude.toString(),
        stickJWTToHeader()
      )
      .then((res) => {
        console.log(res.data);
        res1 = res;
        location1.id = res.data.id;
      })
      .catch((err) => {
        console.log(err);
        res1 = null;
      });
    await axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
          "/Location/GetLocationByLatLong?longtitude=" +
          location2.longtitude.toString() +
          "&latitude=" +
          location2.latitude.toString(),
        stickJWTToHeader()
      )
      .then((res) => {
        console.log(res.data);
        res2 = res;
        location2.id = res.data.id;
      })
      .catch((err) => {
        console.log(err);
        res2 = null;
      });

    if (res1 === null) {
      const newLocation = addLocationMutation.mutate(
        { ...location1 },
        {
          onSuccess: (data) => {
            if (data && "id" in data) {
              location1.id = data?.id as string;
            }
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
      console.log(newLocation);
      // location1.id = newLocation?.id;
    }

    if (res2 === null) {
      const newLocation = addLocationMutation.mutate(
        { ...location2 },
        {
          onSuccess: (data) => {
            if (data && "id" in data) {
              location2.id = data?.id as string;
            }
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
      console.log(newLocation);
      // location2.id = newLocation?.id;
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await checkLocation();

    let customer = {
      name: form.getValues("customerName") as string,
      phoneNumber: form.getValues("customerPhone") as string,
      email: "",
      passwordHash: "",
      password: "",
      rolePermission: 0,
      historyId: "",
    };

    let booking = {
      customerId: "",
      date: new Date().toISOString(),
      customerPhoneNumber: data.customerPhone,
      departureID: location1.id,
      destinationID: location2.id,
      vehicle: bookingForm.vehicle === "Car" ? 1 : 0,
      distance: googleMap.distance ?? 0,
      statusType: 0,
    };

    addCustomer.mutate(customer as any, {
      onSuccess: (data) => {
        if (data && data.data && "id" in data.data) {
          console.log(data);
          booking.customerId = data.data.id as string;
          toast.promise(
            async () => {
              bookingDriverMutation.mutate(booking as any);
            },
            {
              loading: "Creating...",
              success: () => {
                router.push("/dashboard/trips");
                return "Created successfully!";
              },
              error: (error: any) => {
                return error.message;
              },
            }
          );
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });

    // toast.promise(
    //   async () => {
    //     // await axios.post(
    //     //   process.env.NEXT_PUBLIC_BACKEND_API_URL + "/DriverBooking",
    //     //   data
    //     // );

    //     console.log("obj:", booking);
    //     // , {
    //     //   onSuccess: (data) => {
    //     //     console.log(data);
    //     //     if (data && "id" in data) {
    //     //       // setBookingID(data.id as string);
    //     //     }
    //     //   },
    //     //   onError: (error) => {
    //     //     console.log(error);
    //     //   },
    //   },
    //   {
    //     loading: "Booking...",
    //     success: () => {
    //       // router.push("/customer/waitdriver");
    //       return "Booked successfully!";
    //     },
    //     error: (error: any) => {
    //       return error.message;
    //     },
    //   }
    // );
  }

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form className="w-full space-y-3">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    type="text"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Number"
                    {...field}
                    type="text"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Vehicle Type</FormLabel>
            <FormControl>
              <FormVehicleType />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price"
                    {...field}
                    type="text"
                    readOnly
                    value={
                      googleMap.distance
                        ? googleMap.distance && bookingForm.vehicle === "Car"
                          ? "$" + googleMap.distance * 1.5
                          : "$" + googleMap.distance * 0.5
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea
                    className="max-h-44 min-h-28 border-[#E5E7EB]"
                    placeholder="Note for the trip..."
                    {...field}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-foreground text-background"
            onClick={form.handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}
