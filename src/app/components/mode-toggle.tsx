"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative flex items-center justify-center p-2"
          aria-label="Toggle Theme"
        >
          <Sun className="h-5 w-5 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className=" w-36 z-[1000] shadow-lg border border-gray-200 dark:border-gray-700 bg-gray dark:bg-gray-900 rounded-md"
      >
        <DropdownMenuItem onClick={() => setTheme("light")}>☀️ Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>🌙 Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>💻 System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

