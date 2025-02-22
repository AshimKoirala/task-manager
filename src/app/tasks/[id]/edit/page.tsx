"use client"

import { useRouter } from "next/navigation"
import { TaskForm } from "@/app/components/TaskForm"
import { useEffect, useState } from "react"

interface TaskInput {
  title: string
  status: "pending" | "in_progress" | "completed"
  description?: string
}

interface Task extends TaskInput {
  id: string
  createdAt: string
}

export default function EditTask({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/tasks/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch task")
        }
        const data = await response.json()
        setTask({ ...data, status: data.status || "pending" }) // Ensure status exists
      } catch (error) {
        console.error("Error fetching task:", error)
      }
    }
    fetchTask()
  }, [params.id])

  const handleSubmit = async (data: TaskInput) => {
    try {
      const response = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error("Failed to update task")
      }
      router.push("/")
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  if (!task) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Edit Task</h1>
      <TaskForm onSubmit={handleSubmit} initialData={task} />
    </div>
  )
}
