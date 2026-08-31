
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    originalName:{
        type:String,
        required:true
    },

    fileName:String,

    filePath:String,

    fileType:String,

    fileSize:Number,

    aiAnalysis:{
        type:Object,
        default:{}
    }

},{timestamps:true});

module.exports = mongoose.model("Resume",resumeSchema);