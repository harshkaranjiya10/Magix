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
  SidebarTrigger,
} from "@/components/ui/sidebar"

import UserDetails from "@/components/user-details"

import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

import { UserProvider } from "@/context/user-context"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  
  if (!user) redirect("/login")
  if (user.role == "user") redirect("/")

  return (
    <UserProvider user={user}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b bg-background">
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
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-bold"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src={Magix}
                    alt="MagixThenics Logo"
                    width={32}
                    height={32}
                  />
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

          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  )
}
