"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(30, {
      message: "Name must be at most 30 characters long",
    }),
  email: z
    .string()
    .email()
    .min(5, {
      message: "Email must be at least 5 characters long",
    })
    .max(50, {
      message: "Email must be at most 50 characters long",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(50, {
      message: "Password must be at most 50 characters long",
    })
    .refine(
      (password: string) => {
        return (
          password.match(/[a-z]/) &&
          password.match(/[A-Z]/) &&
          password.match(/[0-9]/)
        )
      },
      {
        message:
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
      }
    ),
  confirmPassword: z.string(),
})

export default function Register() {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    console.log(values)

    if (values.password !== values.confirmPassword) {
      setLoading(false)
      return form.setError("confirmPassword", {
        message: "Passwords do not match",
      })
    }

    const { success, error } = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(values),
    }).then((res) => res.json())

    if (!success) {
      setLoading(false)
      return form.setError("email", {
        message: error,
      })
    }

    setLoading(false)

    location.href = "/platform"
  }

  return (
    <>
      <div className="flex flex-col items-center w-full h-full  p-2 justify-center">
        <div className="flex flex-col  gap-2 max-w-[500px] w-full">
          <Link
            href="/auth/login"
            className={cn([buttonVariants({ variant: "outline" }), "ml-auto"])}
          >
            Login
          </Link>

          <Card className="w-full ">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                {" "}
                Create an account to start using our services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
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
                          <Input placeholder="Your Email" {...field} />
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
                            placeholder="Enter a Secure Password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Confirm your password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    loading={loading}
                    variant="default"
                    className="w-full"
                    type="submit"
                  >
                    Sign Up
                  </Button>{" "}
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col gap-5">
              <Separator />
              <Button variant="outline" className="w-full ">
                Continue With Google
              </Button>

              <Separator />

              <p className="text-center text-xs max-w-[300px]">
                By signing up, you agree to our{" "}
                <Link href="/legal/terms" className="underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/legal/privacy" className="underline">
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
