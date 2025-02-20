import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { TaskProvider } from "./context/TaskContext"
import { ThemeProvider } from "./components/theme-provider"
import { Sidebar } from "./components/sidebar"
import { Header } from "./components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A professional task management application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TaskProvider>
            <div className="layout">
              <div className="sidebar">
                <Sidebar />
              </div>
              <div className="main-container">
                <Header/>
                <main className="main-content">
                  <div className="inner-container">{children}</div>
                </main>
              </div>
            </div>
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
