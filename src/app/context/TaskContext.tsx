"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"

interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "in_progress" | "completed"
  createdAt: string
  updatedAt: string
}

interface TaskContextType {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateTask: (updatedTask: Task) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  totalTasks: number
  setTotalTasks: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  isLoading: boolean
  error: string | null
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider")
  }
  return context
}

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [totalTasks, setTotalTasks] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/tasks?page=${currentPage}&limit=10&search=${searchTerm}`)
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText} - ${errorText}`)
      }
      const data = await response.json()
      setTasks(data.tasks)
      setTotalTasks(data.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching tasks")
      console.error("Error fetching tasks:", err)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, searchTerm])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const addTask = useCallback(async (newTask: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
      if (!response.ok) {
        throw new Error("Failed to add task")
      }
      const addedTask = await response.json()
      setTasks((prevTasks) => [addedTask, ...prevTasks])
      setTotalTasks((prevTotal) => prevTotal + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while adding the task")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateTask = useCallback(async (updatedTask: Task) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      })
      if (!response.ok) {
        throw new Error("Failed to update task")
      }
      const updated = await response.json()
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === updated.id ? updated : task)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while updating the task")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteTask = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete task")
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
      setTotalTasks((prevTotal) => prevTotal - 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while deleting the task")
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        updateTask,
        deleteTask,
        totalTasks,
        setTotalTasks,
        currentPage,
        setCurrentPage,
        searchTerm,
        setSearchTerm,
        isLoading,
        error,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

