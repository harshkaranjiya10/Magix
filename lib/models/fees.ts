import mongoose, { Schema, Document } from "mongoose"

export interface IFees extends Document {
  userId: mongoose.Types.ObjectId
  amount: number
  paidOn: Date
  validFrom: Date
  validUntil: Date
  status: "active" | "expired" | "pending"
  notes?: string
}

const FeesSchema = new Schema<IFees>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paidOn: {
      type: Date,
      default: Date.now,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "pending"],
      default: "pending",
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
)

FeesSchema.index({ userId: 1, validUntil: -1 })

const Fees = mongoose.models.Fees || mongoose.model<IFees>("Fees", FeesSchema)

export default Fees
