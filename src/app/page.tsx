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
      <div className="task-card-container">
  <div className="task-card-header">
    <h2>Tasks</h2>
    <Link href="/tasks/new" className="create-task-btn">
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

