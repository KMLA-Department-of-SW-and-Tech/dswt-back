import express from "express"
import type { Request, Response } from "express"

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!")
})

router.post("/", (req: Request, res: Response) => {
  res.send("Hello, World!")
})

router.put("/", (req: Request, res: Response) => {
  res.send("Hello, World!")
})

router.delete("/", (req: Request, res: Response) => {
  res.send("Hello, World!")
})

export default router
