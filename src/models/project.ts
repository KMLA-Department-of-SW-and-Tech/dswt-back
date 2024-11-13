import mongoose from "mongoose"

// 프로젝트 스키마
export const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  photos: [{ type: String }], // 사진 파일 경로 혹은 URL 리스트
  updateNotes: [
    {
      version: { type: String, required: true },
      date: { type: Date, required: true },
      note: { type: String, required: true },
    },
  ],
})

export default mongoose.model("Project", projectSchema)
