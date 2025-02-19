"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

interface CustomThemeProviderProps extends ThemeProviderProps {
  defaultTheme?: string; // Optionally pass a default theme
}

export function ThemeProvider({ children, defaultTheme = "light", ...props }: CustomThemeProviderProps) {
  return (
    <NextThemesProvider {...props} defaultTheme={defaultTheme}>
      {children}
    </NextThemesProvider>
  )
}
