"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    name: z.string().min(1, { message: "Name is a compulsory." }),
    phone: z
      .string()
      .min(6, { message: "Must be a valid mobile number" })
      .max(12, { message: "Must be a valid mobile number" }),
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password is required.",
    }),
    confirm: z.string().min(6, {
      message: "Password is required.",
    }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Password did not match",
    path: ["confirm"],
  });

export default function SignUp() {
  const router = useRouter();

  const signup = async ({
    name,
    phoneNumber,
    email,
    password,
  }: {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
  }) => {
    toast.promise(
      async () => {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API_URL + "/User/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, phoneNumber, email, password }),
          }
        );

        return response;
      },
      {
        loading: "Signing up...",
        success: () => {
          router.push("/auth");
          return "Signed up successfully.";
        },
        error: (error: any) => {
          return "Signup failed:" + error.message;
        },
      }
    );
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await signup({
      email: data.email,
      password: data.password,
      phoneNumber: data.phone,
      name: data.name,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid h-fit w-fit grid-cols-2 gap-4 sm:flex sm:w-full sm:flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your phone number"
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
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Action</FormLabel>
          <Button
            type="submit"
            className="mt-2 w-full bg-foreground text-background"
          >
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
}
