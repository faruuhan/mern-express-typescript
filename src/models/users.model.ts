import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: null },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, select: false },
    userImage: {
      type: String,
      default: "default.jpg",
    },
    userStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, versionKey: false }
);

export default mongoose.model("usersModel", usersSchema, "users");
