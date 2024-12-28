import express from "express"
import type { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import router from "./routes"
import mongoose from "mongoose"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || "development"

// Mongoose 연결
const dev_uri = "mongodb://localhost:27017/dwst_back"
const uri = process.env.MONGO_URI || dev_uri
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 라우트 설정
app.use("/", router)

// 에러 핸들링
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

export default app

if (NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}
