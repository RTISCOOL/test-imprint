"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  chat: z.string().min(1, {
    message: "Chat must be at least 1 characters long",
  }),
})
const exampleQuestions = [
    "Why is ryan so cool?",
    "Why did ryan become the worlds best programmer?",
    "Rate Ryan's amazingness score rate 1-10",
]
export default function ChatBox() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chat: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <>
    <div className="flex flex-col md:flex-row gap-1 md:gap-3 px-5">
        {
            exampleQuestions.map((question) => {
                return (
                    <Button variant="outline" size="sm">
                        {question}
                    </Button>
                )
            })
        }
    </div>
      <div className="flex flex-row justify-between items-center py-3 px-5  gap-5 border-b bg-background md:pb-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-row gap-2 w-full"
          >
            <FormField
              control={form.control}
              name="chat"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Ask a Question"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button variant="default" type="submit">
              <Send className="h-5 w-5" />
            </Button>{" "}
          </form>
        </Form>
      </div>
    </>
  )
}
