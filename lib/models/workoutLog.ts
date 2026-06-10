// models/WorkoutLog.js
import mongoose from "mongoose"

const WorkoutLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Can be athlete or coach
  originalRoutine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkoutRoutine",
  }, // Optional: if started from a template
  name: { type: String, required: true }, // e.g., "Upper Body Power" or "Quick Empty Workout"
  date: { type: Date, default: Date.now },
  duration: { type: Number }, // Duration of workout in minutes
  exercises: [
    {
      exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
        required: true,
      },
      sets: [
        {
          setNumber: { type: Number, required: true },
          reps: { type: Number, default: 0 },
          weight: { type: Number, default: 0 }, // In kg/lbs (crucial for Weighted Calisthenics like weighted pullups)
          isCompleted: { type: Boolean, default: false },
          rpe: { type: Number, min: 1, max: 10 }, // Optional: Rate of Perceived Exertion for tracking intensity
        },
      ],
    },
  ],
  notes: { type: String }, // General session notes ("felt strong today!")
  createdAt: { type: Date, default: Date.now },
})

export default module.exports =
  mongoose.models.WorkoutLog || mongoose.model("WorkoutLog", WorkoutLogSchema)
