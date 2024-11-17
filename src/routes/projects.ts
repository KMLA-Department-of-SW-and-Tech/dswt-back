import express from "express"
import type { Request, Response } from "express"

const router = express.Router()

// project page

router.get("/:id", (req: Request, res: Response) => {
  res.send(`project id ${req.params.id} get`)
})

router.post("/:id", (req: Request, res: Response) => {
  res.send(`project id ${req.params.id} post`)
})

router.put("/:id", (req: Request, res: Response) => {
  res.send(`project id ${req.params.id} put`)
})

router.delete("/:id", (req: Request, res: Response) => {
  res.send(`project id ${req.params.id} delete`)
})

// project detail page

router.get("/:id/detail", (req: Request, res: Response) => {
  res.send(`project id ${req.params.id} detail get`)
})

router.post("/:id/detail", (req: Request, res: Response) => {
  res.send(`project id ${req.params.id} detail post`)
})

router.put("/:id/detail", (req: Request, res: Response) => {
  res.send(`project id ${req.params.id} detail put`)
})

router.delete("/:id/detail", (req: Request, res: Response) => {
  res.send(`project id ${req.params.id} detail delete`)
})

export default router
