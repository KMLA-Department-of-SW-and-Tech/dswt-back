import mongoose from "mongoose"

// 부원 스키마
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true }, // 사진 파일 경로 혹은 URL
  team: { type: String, required: true },
})

export default mongoose.model("Member", memberSchema)
