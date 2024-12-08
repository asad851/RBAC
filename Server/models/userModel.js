import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
    permissions: { type: String },
    email: {
      type: String,
      required: true,
      // unique: true, // Ensure unique email addresses
      lowercase: true, // Store email in lowercase
      trim: true, // Remove any extra spaces
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields automatically
  }
);

export default mongoose.model("User", userSchema);
