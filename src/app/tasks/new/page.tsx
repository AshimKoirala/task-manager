"use client"

import { useRouter } from "next/navigation"
import { TaskForm } from "@/app/components/TaskForm"

interface TaskInput {
  title: string
  status: "pending" | "in_progress" | "completed"
  description?: string
}

export default function NewTask() {
  const router = useRouter()

  const handleSubmit = async (data: TaskInput) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      router.push("/")
    } else {
      console.error("Failed to create task")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Create New Task</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  )
}

