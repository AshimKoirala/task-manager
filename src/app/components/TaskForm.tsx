"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["pending", "in_progress", "completed"]),
})

type TaskFormData = z.infer<typeof taskSchema>

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void
  initialData?: TaskFormData
}

export function TaskForm({ onSubmit, initialData }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="task-form">
  <div className="form-group">
    <label htmlFor="title" className="form-label">Title</label>
    <input
      type="text"
      id="title"
      {...register("title")}
      className="form-input"
    />
    {errors.title && <p className="error-message">{errors.title.message}</p>}
  </div>
  <div className="form-group">
    <label htmlFor="description" className="form-label">Description</label>
    <textarea
      id="description"
      {...register("description")}
      rows={3}
      className="form-textarea"
    ></textarea>
  </div>
  <div className="form-group">
    <label htmlFor="status" className="form-label">Status</label>
    <select
      id="status"
      {...register("status")}
      className="form-select"
    >
      <option value="pending">Pending</option>
      <option value="in_progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  </div>
  <button
    type="submit"
    className="form-button"
  >
    Save Task
  </button>
</form>

  )
}

