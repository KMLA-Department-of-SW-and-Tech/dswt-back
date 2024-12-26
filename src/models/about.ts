import mongoose from "mongoose"

// 부서 소개 스키마
const aboutSchema = new mongoose.Schema({
  introduction: { type: String, required: true }
})

export default mongoose.model("About", aboutSchema)
