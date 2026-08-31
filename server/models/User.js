
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFORMATION
    // =========================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    // =========================
    // PROFILE INFORMATION
    // =========================

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    degree: {
      type: String,
      default: "BCA",
      trim: true,
    },

    college: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: String,
      default: "Final Year",
      trim: true,
    },

    targetRole: {
      type: String,
      default: "MERN Developer",
      trim: true,
    },
    // =========================
// SETTINGS / PREFERENCES
// =========================

interviewDifficulty: {
  type: String,
  default: "Medium",
  enum: ["Easy", "Medium", "Hard"],
},

aiResponseStyle: {
  type: String,
  default: "Simple",
  enum: ["Simple", "Professional", "Detailed"],
},

theme: {
  type: String,
  default: "dark",
  enum: ["dark", "light"],
},

    skills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);