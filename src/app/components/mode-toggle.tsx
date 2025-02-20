"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
   <div className="mode-toggle">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        className="mode-toggle-button"
        aria-label="Toggle Theme"
      >
        <Sun className="mode-toggle-sun" />
        <Moon className="mode-toggle-moon" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="end"
      className="mode-toggle-menu"
    >
      <DropdownMenuItem onClick={() => setTheme("light")}>☀️ Light</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>🌙 Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>💻 System</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
  )
}

