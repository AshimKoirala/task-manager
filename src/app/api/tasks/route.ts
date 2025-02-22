import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = Number.parseInt(searchParams.get("page") || "1", 10)
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10)
  const search = searchParams.get("search") || undefined

  if (page <= 0 || limit <= 0) {
    return NextResponse.json({ error: "Page and limit must be positive numbers" }, { status: 400 })
  }

  const skip = (page - 1) * limit

  try {
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where: search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : undefined,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.task.count({
        where: search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : undefined,
      }),
    ])

    return NextResponse.json({
      tasks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Error fetching tasks" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    if (!json.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const task = await prisma.task.create({
      data: json,
    })
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ error: "Error creating task" }, { status: 500 })
  }
}

