type NavItem = {
  title: string
  url: string
  isActive?: boolean
  role?: string
  items?: {
    // ← add this
    title: string
    url: string
    isActive?: boolean
  }[]
}

export const data: { navMain: NavItem[] } = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      isActive: true,
    },
    {
      title: "Workout",
      url: "/dashboard/workout",
    },
    {
      title: "Attendance",
      url: "/dashboard/attendance",
      role: "coach",
    },
  ],
}

export const data2 = {
  id: "728ed52f",
  amount: 100,
  status: "pending",
  email: "m@example.com",
}
