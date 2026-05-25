// context/user-context.tsx
"use client"

import { createContext, useContext } from "react"

type User = {
  userId: string
  name: string
  mobile: string
  role: string
  avatar: string
}

const UserContext = createContext<User | null>(null)

export function UserProvider({ user, children }: { user: User; children: React.ReactNode }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
    
export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used inside UserProvider")
  return context
}