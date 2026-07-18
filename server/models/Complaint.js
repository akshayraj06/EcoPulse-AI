import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema(
  {
    label: String,
    detail: String,
    status: {
      type: String,
      enum: ["complete", "active", "pending"],
      default: "pending",
    },
  },
  { _id: false, timestamps: true }
);

const aiAnalysisSchema = new mongoose.Schema(
  {
    detected: Boolean,
    category: String,
    severity: String,
    confidence: Number,
    garbageAmount: String,
    recyclingAdvice: String,
    environmentalImpact: String,
    recommendation: String,
  },
  { _id: false }
);

const cleaningVerificationSchema = new mongoose.Schema(
  {
    cleanlinessScore: Number,
    confidence: Number,
    differenceDetected: Boolean,
    result: String,
    nextAction: String,
  },
  { _id: false }
);

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      unique: true,
      index: true,
    },
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedWorker: {
      name: {
        type: String,
        default: "Worker Team B",
      },
      phone: {
        type: String,
        default: "+91 9876543210",
      },
    },
    assignedArea: {
      type: String,
      default: "Kukatpally Zone",
    },
    estimatedResponseTime: {
      type: String,
      default: "30-45 minutes",
    },
    ignoreCount: {
      type: Number,
      default: 0,
    },
    escalated: {
      type: Boolean,
      default: false,
    },
    escalationReason: {
      type: String,
      default: "",
    },
    image: String,
    beforeImage: String,
    afterImage: String,
    cleaningVerification: cleaningVerificationSchema,
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Submitted", "Assigned", "Accepted", "Cleaning", "Verification", "Completed"],
      default: "Submitted",
    },
    aiAnalysis: aiAnalysisSchema,
    timeline: [timelineSchema],
  },
  {
    timestamps: true,
  }
);

complaintSchema.pre("validate", async function setComplaintId() {
  if (this.complaintId) {
    return;
  }

  const count = await mongoose.model("Complaint").countDocuments();
  this.complaintId = `CP-${String(1024 + count).padStart(4, "0")}`;
});

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
