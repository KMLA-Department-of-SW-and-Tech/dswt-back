import express from "express"
import type { Request, Response } from "express"
import projectRouter from "./project"
import memberRouter from "./member"

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

router.use("/projects", projectRouter)

router.use("/members", memberRouter)

export default router
