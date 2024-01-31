"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/util/theme-toggle"

import Navigation from "./Navigation"

export default function NavClient({ loggedIn }: { loggedIn: boolean }) {
  const [showMobile, setShowMobile] = useState(false)

  return (
    <>
      <div className="flex flex-row justify-between items-center py-3 px-5  gap-5 border-b bg-background">
        <Logo />
        <div className=" md:flex hidden flex-row">
          <Navigation loggedIn={loggedIn} mobile={false} />
        </div>
        <div className="hidden md:flex flex-row items-center space-x-3 ml-auto">
          {loggedIn ? (
            <Link href="/platform">
              <Button variant="outline" size="sm">
                Go To Platform
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="flex flex-row">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobile(!showMobile)}
          >
            {showMobile ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      {showMobile && (
        <div className="md:hidden flex flex-col items-center justify-center w-full p-3 bg-background">
          <div className="flex flex-col w-full items-center gap-3">
            <Navigation loggedIn={loggedIn} mobile={true} />

            {loggedIn ? (
              <Link
                href="/platform"
                className={cn([
                  buttonVariants({ variant: "outline" }),
                  "w-full",
                ])}
              >
                Go To Platform
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={cn([
                    buttonVariants({ variant: "outline" }),
                    "w-full",
                  ])}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className={cn([
                    buttonVariants({ variant: "default" }),
                    "w-full",
                  ])}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
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

function Mobile() {}
