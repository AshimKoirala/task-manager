"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, CheckSquare, BarChart2, Settings } from "lucide-react"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart2,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sidebar">
  <div className="sidebar-header">
    <LayoutDashboard className="icon" />
    <span>Task Manager</span>
  </div>

  <nav className="sidebar-nav">
    {sidebarNavItems.map((item) => {
      const isActive = pathname.startsWith(item.href);

      return (
        <Link key={item.href} href={item.href} className={`sidebar-link ${isActive ? 'active' : ''}`}>
          <item.icon className="icon" />
          {item.title}
        </Link>
      );
    })}
  </nav>
</aside>

  )
}

