"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { UserNav } from "./user-nav"

export function Header() {
  return (
   <header className="sticky-header">
  <div className="header-container">
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
</header>

  )
}
