"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button onClick={() => reset()} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Try again
      </button>
    </div>
  )
}

