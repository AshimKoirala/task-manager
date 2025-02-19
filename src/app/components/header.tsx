"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { UserNav } from "./user-nav"

export function Header() {
  return (
   <header className="sticky-header">
  <div className="header-container">
    <div className="header-logo">
      <Link className="mr-6 flex items-center space-x-2" href="/">
        <span className="font-bold sm:inline-block">Task Manager</span>
      </Link>
    </div>
    <div className="header-nav">
      <div className="w-full flex-1 md:w-auto md:flex-none">{/* search functionality */}</div>
      <nav className="flex items-center space-x-2">
        <Link href="/tasks/new" passHref>
          <button className="header-button">New Task</button>
        </Link>
        <div className="mode-toggle">
          <ModeToggle />
        </div>
       <div>
         <UserNav />
       </div>
      </nav>
    </div>
  </div>
</header>

  )
}
