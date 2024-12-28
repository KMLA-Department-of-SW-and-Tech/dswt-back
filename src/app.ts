import express from "express"
import type { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import router from "./routes"
import mongoose from "mongoose"
import querystring from "querystring"

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

// req.body가 Buffer인 경우 이를 JSON으로 파싱하는 미들웨어
app.use((req: Request, res: Response, next: NextFunction): void => {
  if (Buffer.isBuffer(req.body) && req.is("application/json")) {
    try {
      req.body = JSON.parse(req.body.toString())
    } catch {
      res.status(400).send("Invalid JSON")
      return
    }
  }
  next()
})

// req.body가 Buffer인 경우 이를 URL-encoded 데이터로 파싱하는 미들웨어
app.use((req, res, next) => {
  if (
    Buffer.isBuffer(req.body) &&
    req.is("application/x-www-form-urlencoded")
  ) {
    const bodyString = req.body.toString("utf-8")
    req.body = querystring.parse(bodyString)
  }
  next()
})

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
