"use client"

import { useTaskContext } from "../context/TaskContext"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export function Dashboard() {
  const { tasks } = useTaskContext()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const pendingTasks = tasks.filter((task) => task.status === "pending").length
  const inProgressTasks = tasks.filter((task) => task.status === "in_progress").length

  const data = {
    labels: ["Completed", "Pending", "In Progress"],
    datasets: [
      {
        data: [completedTasks, pendingTasks, inProgressTasks],
        backgroundColor: ["#10B981", "#F59E0B", "#3B82F6"],
        hoverBackgroundColor: ["#059669", "#D97706", "#2563EB"],
      },
    ],
  }

  return (
<div className="dashboard-container">
  <h2 className="dashboard-header">Dashboard</h2>
  <div className="dashboard-grid">
  <div className="dashboard-progress-card">
    <div className="dashboard-card bg-green-100 dark:bg-green-800">
      <h3 className="card-title text-green-800 dark:text-green-100">Completed Tasks</h3>
      <p className="card-value text-green-600 dark:text-green-200">{completedTasks}</p>
    </div>
    <div className="dashboard-card bg-yellow-100 dark:bg-yellow-800">
      <h3 className="card-title text-yellow-800 dark:text-yellow-100">Pending Tasks</h3>
      <p className="card-value text-yellow-600 dark:text-yellow-200">{pendingTasks}</p>
    </div>
    <div className="dashboard-card bg-blue-100 dark:bg-blue-800">
      <h3 className="card-title text-blue-800 dark:text-blue-100">In Progress Tasks</h3>
      <p className="card-value text-blue-600 dark:text-blue-200">{inProgressTasks}</p>
    </div>
    <div className="dashboard-card bg-purple-100 dark:bg-purple-800">
      <h3 className="card-title text-purple-800 dark:text-purple-100">Total Tasks</h3>
      <p className="card-value text-purple-600 dark:text-purple-200">{totalTasks}</p>
      </div>
    </div>
    <div className="doughnut">
      <Doughnut data={data} />
    </div>
  </div>
</div>

  )
}

