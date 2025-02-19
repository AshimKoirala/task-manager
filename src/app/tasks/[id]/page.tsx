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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
      <p className="mb-4">{task.description}</p>
      <p className="mb-4">Status: {task.status}</p>
      <div className="flex space-x-4">
        <Link
          href={`/tasks/${task.id}/edit`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit Task
        </Link>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to List
        </Link>
      </div>
    </div>
  )
}

