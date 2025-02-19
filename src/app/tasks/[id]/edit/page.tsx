"use client"

import { useRouter } from "next/navigation"
import { TaskForm } from "@/app/components/TaskForm"
import { useEffect, useState } from "react"

export default function EditTask({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [task, setTask] = useState<any>(null)

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`/api/tasks/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setTask(data)
      } else {
        console.error("Failed to fetch task")
      }
    }
    fetchTask()
  }, [params.id])

  const handleSubmit = async (data: any) => {
    const response = await fetch(`/api/tasks/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      router.push("/")
    } else {
      // Handle error
      console.error("Failed to update task")
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

