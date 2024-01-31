import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:min-h-screen  ">
        <div className="flex flex-col items-start flex-1  p-4">
          <Link
            href="/"
            className={cn([
              buttonVariants({ variant: "outline" }),
              "flex flex-row gap-1",
            ])}
          >
            <ArrowLeft className="h-3 w-3" />
            Home
          </Link>
          
          <div className="flex flex-col mt-auto">
            <h2 className="text-2xl font-bold mt-3">
              Welcome to Query The World
            </h2>
            <p className="text-gray-500 mt-2">
              Ask questions about the visible world in real time
            </p>
          </div>
        </div>
        <div className="flex flex-col flex-1 border-l dark:bg-slate-950">
          {children}
        </div>
      </div>
    </>
  )
}
