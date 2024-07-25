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
import useUserSessionStore, { UserSessionStore } from "@/zustand/useSession";
import useBookingForm, { useBookingFormState } from "@/zustand/useBookingForm";
import axios from "axios";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function SignIn() {
  const router = useRouter();
  const { clearAll } = useBookingForm() as useBookingFormState;
  const { setLogin } = useUserSessionStore() as UserSessionStore;

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    toast.promise(
      async () => {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API_URL + "/User/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Email: email, password }),
          }
        );
        clearAll();
        const data = await response.json();
        const postEmail = {
          email: data?.email,
        };
        localStorage.setItem("token", data?.token);
        if (data?.rolePermission === 0) {
          await axios
            .post(
              process.env.NEXT_PUBLIC_BACKEND_API_URL +
                "/Customer/GetCustomerByEmail",
              postEmail
            )
            .then((res) => {
              setLogin(
                res.data.id,
                data?.name,
                data?.email,
                data?.rolePermission,
                data?.phoneNumber
              );
            });
        } else if (data?.rolePermission === 1) {
          await axios
            .post(
              process.env.NEXT_PUBLIC_BACKEND_API_URL +
                "/Driver/GetDriverByEmail",
              postEmail
            )
            .then((res) => {
              setLogin(
                res.data.id,
                data?.name,
                data?.email,
                data?.rolePermission,
                data?.phoneNumber
              );
            });
        } else if (data?.rolePermission === 2) {
          await axios
            .post(
              process.env.NEXT_PUBLIC_BACKEND_API_URL +
                "/Admin/GetAdminByEmail",
              postEmail
            )
            .then((res) => {
              setLogin(
                res.data.id,
                data?.name,
                data?.email,
                data?.rolePermission,
                data?.phoneNumber
              );
            });
        }

        return response;
      },
      {
        loading: "Sign in...",
        success: () => {
          router.push("/");
          return "Signed in successfully.";
        },
        error: (error: any) => {
          return "Login failed:" + error.message;
        },
      }
    );
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await login({
      email: data.email,
      password: data.password,
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    type="email"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    {...field}
                    type="password"
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full">
            <Button
              type="submit"
              className="w-full bg-foreground text-background"
            >
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
