const { Schema, model } = require("mongoose");

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      enum: [
        "frontend",
        "backend",
        "devops",
        "mern stack",
        "digital marketing",
      ],
    },
    contact: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  {
    timestamps: true,
    timeseries: true,
  },
);

module.exports = model("students", StudentSchema);
