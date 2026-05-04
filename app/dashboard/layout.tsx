import Image from "next/image"
import Link from "next/link"
import Magix from "@/public/Magix-bg.png"

import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar"

import UserDetails from "@/components/user-details"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b sticky top-0 z-10 bg-background">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2" />

            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{children}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
            <Link  href="/dashboard" className="font-bold flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src={Magix} alt="MagixThenics Logo" width={32} height={32}/>
                </div>
                <div className="leading-none">
                  <div className="font-medium">MagixThenics</div>
                </div>
            </Link>
              {/* <h1 className="text-2xl font-bold">Motivational Quote</h1> */}
          </div>

          <div className="ml-auto flex items-center gap-2 p-4">
            <UserDetails />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}