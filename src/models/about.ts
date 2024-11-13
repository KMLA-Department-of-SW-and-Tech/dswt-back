import mongoose from "mongoose"
import { projectSchema } from "./project"

// 부서 소개 스키마
const aboutSchema = new mongoose.Schema({
  introduction: { type: String, required: true },
  projects: [projectSchema],
})

export default mongoose.model("About", aboutSchema)
