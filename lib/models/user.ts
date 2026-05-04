import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: String,
    mobile: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["user", "coach", "admin"],
      default: "user",
    },
    joiningDate: Date,
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.User || mongoose.model("User", UserSchema)
