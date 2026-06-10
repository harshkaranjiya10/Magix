import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import WorkoutLog from "@/lib/models/workoutLog"

export async function GET(request: Request) {
  await connectDB()
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const exerciseId = searchParams.get("exerciseId") // e.g., Pull-up id

  try {
    // Find logs for this user containing the specific exercise
    const logs = await WorkoutLog.find({
      user: userId,
      "exercises.exercise": exerciseId,
    }).sort({ date: 1 }) // Chronological order

    const chartData = logs.map((log) => {
      // Extract the sets for this specific exercise
      const exerciseInstance = log.exercises.find(
        (e) => e.exercise.toString() === exerciseId
      )

      // Calculate max weight and max reps in this session
      const weights = exerciseInstance.sets.map((s) => s.weight)
      const reps = exerciseInstance.sets.map((s) => s.reps)

      const maxWeight = Math.max(...weights, 0)
      const maxReps = Math.max(...reps, 0)
      const totalVolume = exerciseInstance.sets.reduce(
        (sum: number, set: any) => sum + set.reps * (set.weight || 1),
        0
      )

      return {
        date: new Date(log.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        weight: maxWeight,
        reps: maxReps,
        volume: totalVolume,
      }
    })

    return NextResponse.json(chartData)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
