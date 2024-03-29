"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Navigation({
  loggedIn,
  mobile,
}: {
  loggedIn: boolean
  mobile: boolean
}) {
  return (
    <NavigationMenu
      className={cn(mobile && "w-full")}
      orientation={mobile ? "vertical" : "horizontal"}
    >
      <NavigationMenuList
        className={cn(mobile && "flex flex-col gap-2 mb-2 mt-2 w-full")}
      >
        <NavigationMenuItem>
          <NavigationMenuTrigger>Information</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="Lorem ipsum">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </ListItem>
              <ListItem href="/docs/installation" title="Lorem ipsum">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Lorem ipsum">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </ListItem>
              <ListItem href="/docs" title="Lorem ipsum">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </ListItem>
              <ListItem href="/docs/installation" title="Lorem ipsum">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Lorem ipsum">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Information 2</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="Lorem ipsum">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </ListItem>
              <ListItem href="/docs/installation" title="Lorem ipsum">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Lorem ipsum">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </ListItem>
              <ListItem href="/docs" title="Lorem ipsum">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </ListItem>
              <ListItem href="/docs/installation" title="Lorem ipsum">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Lorem ipsum">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
