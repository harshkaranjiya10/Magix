import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  attended: {
    type: Boolean,
    default: false,
  },

  workout: {
    type: String, // optional (Push Day, Legs, etc.)
    default: "",
    //type: WorkoutId (scalling...)
  },

  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // coach/admin who marked
  },

}, { timestamps: true });

attendanceSchema.index({ userId: 1, date: 1 }, { unique: true }); //Primary entities


export default mongoose.models.Attendance ||
  mongoose.model("Attendance", attendanceSchema);