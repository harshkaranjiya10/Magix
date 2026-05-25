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
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    avatar: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.User || mongoose.model("User", UserSchema)
