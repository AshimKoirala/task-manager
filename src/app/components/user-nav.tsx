"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import dynamic from "next/dynamic"

const DynamicDropdownMenu = dynamic(() => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenu), {
  ssr: false,
})
const DynamicDropdownMenuTrigger = dynamic(
  () => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuTrigger),
  { ssr: false },
)
const DynamicDropdownMenuContent = dynamic(
  () => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuContent),
  { ssr: false },
)
const DynamicDropdownMenuLabel = dynamic(
  () => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuLabel),
  { ssr: false },
)
const DynamicDropdownMenuSeparator = dynamic(
  () => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuSeparator),
  { ssr: false },
)
const DynamicDropdownMenuItem = dynamic(
  () => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuItem),
  { ssr: false },
)

export function UserNav() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
<DynamicDropdownMenu>
  <DynamicDropdownMenuTrigger asChild>
    <Button variant="ghost" className="user-nav-trigger">
      <Avatar className="user-nav-avatar">
        <AvatarImage src="" alt="@example" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    </Button>
  </DynamicDropdownMenuTrigger>
  <DynamicDropdownMenuContent className="user-nav-dropdown" align="end" forceMount>
    <DynamicDropdownMenuLabel className="font-normal">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">Welcome Back</p>
        <p className="text-xs leading-none text-muted-foreground">a@example.com</p>
      </div>
    </DynamicDropdownMenuLabel>
    <DynamicDropdownMenuSeparator />
    <DynamicDropdownMenuItem className="user-nav-dropdown-item">Profile</DynamicDropdownMenuItem>
    <DynamicDropdownMenuItem className="user-nav-dropdown-item">Settings</DynamicDropdownMenuItem>
    <DynamicDropdownMenuSeparator />
    <DynamicDropdownMenuItem className="user-nav-dropdown-item">Log out</DynamicDropdownMenuItem>
  </DynamicDropdownMenuContent>
</DynamicDropdownMenu>

  )
}
