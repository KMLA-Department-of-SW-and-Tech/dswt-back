import express from "express"
import type { Request, Response } from "express"
import authenticateToken from "../middlewares/verifyToken"

const router = express.Router()

router.get("/protected", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "인증된 사용자입니다.", user: req.user })
})
