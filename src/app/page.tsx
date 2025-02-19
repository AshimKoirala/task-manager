"use client"

import { useEffect } from "react"
import Link from "next/link"
import { TaskList } from "./components/TaskList"
import { useTaskContext } from "./context/TaskContext"
// import { SearchBar } from "./components/SearchBar"
// import { Pagination } from "./components/Pagination"
import { Dashboard } from "./components/Dashboard"

export default function Home() {
  const { tasks, setTasks, totalTasks, setTotalTasks, currentPage, searchTerm } = useTaskContext()

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`/api/tasks?page=${currentPage}&limit=10&search=${searchTerm}`)
      if (response.ok) {
        const data = await response.json()
        setTasks(data.tasks)
        setTotalTasks(data.total)
      } else {
        console.error("Failed to fetch tasks")
      }
    }
    fetchTasks()
  }, [currentPage, searchTerm, setTasks, setTotalTasks])

  return (
    <div className="space-y-6">
      <Dashboard />
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <Link
            href="/tasks/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Create New Task
          </Link>
        </div>
        {/* <SearchBar /> */}
        <TaskList tasks={tasks} />
        {/* <Pagination totalItems={totalTasks} itemsPerPage={10} /> */}
      </div>
    </div>
  )
}

