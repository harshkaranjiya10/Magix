"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Link from "next/link"

import { NavUser } from "@/components/nav-user"

import Image from "next/image"
import Magix from "@/public/Magix-bg.png"
import { data } from "@/lib/data"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const user = {
    name: "John Doe",
    mobile: "34567890",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=3",
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {/* <GalleryVerticalEndIcon className="size-4" /> */}
                 {/* <Image src={Magix} alt="MagixThenics Logo" width={32} height={32} /> */}
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  {/* <span className="font-medium">MagixThenics</span> */}
                  {/* <span className="">v1</span> */}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
       <SidebarFooter>
        <NavUser user={user} />
       </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}