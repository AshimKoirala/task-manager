"use client"

import Link from "next/link"
import { useTaskContext } from "../context/TaskContext"
import { CheckCircle, Clock, AlertCircle, Edit, Trash2 } from "lucide-react"

interface Task {
  id: string
  title: string
  status: string
  description: string
}

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  const { deleteTask } = useTaskContext()

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      deleteTask(id)
    } else {
      console.error("Failed to delete task")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />
    }
  }

return (
  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
    {tasks.map((task) => (
      <li
        key={task.id}
        className="py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150 ease-in-out"
        role="listitem"
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">{getStatusIcon(task.status)}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{task.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{task.description}</p>
          </div>
          <div className="flex space-x-2">
            <Link
              href={`/tasks/${task.id}`}
              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
              aria-label={`Edit task: ${task.title}`}
            >
              <Edit className="h-5 w-5" />
            </Link>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
              aria-label={`Delete task: ${task.title}`}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </li>
    ))}
  </ul>
)

}

