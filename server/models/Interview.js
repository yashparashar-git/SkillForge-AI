const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      default: "",
    },

    feedback: {
      type: String,
      default: "",
    },

    score: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      default: "General",
    },
  },
  { _id: false }
);

const interviewSchema = new mongoose.Schema(
  {
    // User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Interview Details
    role: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    totalQuestions: {
      type: Number,
      default: 10,
    },

    currentQuestion: {
      type: Number,
      default: 1,
    },

    // Interview Flow
    stage: {
      type: String,
      enum: [
        "Introduction",
        "Education",
        "Resume",
        "Project",
        "Technical",
        "Coding",
        "HR",
        "Completed",
      ],
      default: "Introduction",
    },

    stageQuestionCount: {
      type: Number,
      default: 1,
    },
    projectQuestionsAsked:{

type:Number,

default:0

},
technicalTopicIndex: {
    type: Number,
    default: 0
},

technicalQuestionCount: {
    type: Number,
    default: 0
},

currentTechnicalTopic: {
    type: String,
    default: ""
},


    status: {
      type: String,
      enum: ["In Progress", "Completed"],
      default: "In Progress",
    },

    // AI Memory
    conversationHistory: [
      {
        role: String,
        content: String,
      },
    ],

    // Questions
    questions: [questionSchema],

    // Final Report
    report: {
      technical: {
        type: Number,
        default: 0,
      },

      communication: {
        type: Number,
        default: 0,
      },

      confidence: {
        type: Number,
        default: 0,
      },

      projectKnowledge: {
        type: Number,
        default: 0,
      },

      problemSolving: {
        type: Number,
        default: 0,
      },

      overallScore: {
        type: Number,
        default: 0,
      },

      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      recommendations: {
        type: [String],
        default: [],
      },
    },

    finalScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interview", interviewSchema);