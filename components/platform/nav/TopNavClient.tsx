"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/util/theme-toggle"

export default function TopNavClient({ user }: { user: SessionData["user"] }) {
  return (
    <>
      <div className="flex flex-row justify-between items-center py-3 px-5  gap-5 border-b bg-background">
        <Logo />
        <div className=" flex flex-row items-center space-x-3 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn([
                buttonVariants({ variant: "outline", size: "sm" }),
                "flex flex-row gap-2",
              ])}
            >
              {user?.name}
              <ChevronDown className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Chat History</DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>

              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  location.href = "/api/auth/logout"
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />
        </div>
      </div>
    </>
  )
}
function Logo() {
  return (
    <>
      <h1 className="text-xl  leading-tight tracking-tighter ">
        Query The World
      </h1>
    </>
  )
}
