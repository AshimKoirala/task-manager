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
<ul className="task-list">
  {tasks.map((task) => (
    <li key={task.id} className="task-card">
      <div className="task-header">
        <div className="status-icon">{getStatusIcon(task.status)}</div>
        <div className="task-title">{task.title}</div>
        <div className="task-desc">{task.description}</div>
      </div>

      <div className="task-action-btns">
        <Link href={`/tasks/${task.id}`} className="task-action-btn edit">
          <Edit />
        </Link>
        <button onClick={() => handleDelete(task.id)} className="task-action-btn delete">
          <Trash2 />
        </button>
      </div>
    </li>
  ))}
</ul>
)

}

