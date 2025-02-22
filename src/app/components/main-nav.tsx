import type React from "react"
import Link from "next/link"

export function MainNav({ ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav {...props}>
      <Link href="/">Dashboard</Link>
      <Link href="/">Tasks</Link>
      <Link href="/"> Analytics</Link>
    </nav>
  )
}
