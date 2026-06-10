"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const aboutItems = [
  {
    title: "About Us",
    href: "/about",
    description: "Learn more about the MagixThenics journey and mission.",
  },
  {
    title: "Contact Us",
    href: "/about#contact",
    description: "Get in touch with our team anytime.",
  },
  {
    title: "FAQs",
    href: "/about#faqs",
    description: "Frequently asked questions about training and programs.",
  },
]

const focusItems = [
  {
    title: "Calisthenics",
    href: "/explore/history",
    description: "Master bodyweight strength and movement.",
  },
  {
    title: "Freestyle",
    href: "/explore/freestyle",
    description: "Unlock dynamic tricks and flow combinations.",
  },
  {
    title: "Flexible",
    href: "/explore/flexible",
    description: "Improve mobility and flexibility naturally.",
  },
  {
    title: "Aesthetics",
    href: "/explore/inspiration",
    description: "Build a lean, athletic, aesthetic physique.",
  },
]

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Success Stories */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/explore">Explore</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Our Focus */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Our Focus</NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              {focusItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* About */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-[350px] gap-3 p-4">
              {aboutItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block rounded-md p-3 transition-colors hover:bg-muted"
        >
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>

            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
