import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function TaskDetail({ params }: { params: { id: string } }) {
  const task = await prisma.task.findUnique({
    where: { id: params.id },
  })

  if (!task) {
    return <div>Task not found</div>
  }

  return (
    <div className="task-detail-container">
      <h1 className="task-detail-title">{task.title}</h1>
      <p className="task-detail-description">{task.description}</p>
      <p className="task-detail-status">Status: {task.status}</p>
      <div className="task-action-buttons">
        <Link
          href={`/tasks/${task.id}/edit`}
          className="task-action-button task-action-edit"
        >
          Edit Task
        </Link>
        <Link
          href="/"
          className="task-action-button task-action-back"
        >
          Back to List
        </Link>
      </div>
    </div>
  )
}

