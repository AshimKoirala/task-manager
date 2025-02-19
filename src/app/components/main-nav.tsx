import type React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-6 lg:space-x-8", className)} {...props}>
      <Link
        href="/"
        className="text-base font-semibold text-gray-900 dark:text-gray-100 transition-colors hover:text-indigo-600 focus:text-indigo-600"
      >
        Dashboard
      </Link>
      <Link
        href="/tasks"
        className="text-base font-semibold text-gray-500 dark:text-gray-400 transition-colors hover:text-indigo-600 focus:text-indigo-600"
      >
        Tasks
      </Link>
      <Link
        href="/analytics"
        className="text-base font-semibold text-gray-500 dark:text-gray-400 transition-colors hover:text-indigo-600 focus:text-indigo-600"
      >
        Analytics
      </Link>
    </nav>
  )
}
