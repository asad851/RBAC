import mongoose from "mongoose";
const announcementSchema = new mongoose.Schema(
  {
    announcement: {
      type: String,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields automatically
  }
);
export default mongoose.model("Announcement", announcementSchema);