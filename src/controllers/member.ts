import Member from "../models/member"
import { Request, Response, RequestHandler } from "express"
import { body, validationResult } from "express-validator"

// Update member controller
export const updateMember = [
  [
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description is required"),
    body("photo").optional().notEmpty().withMessage("Photo is required"),
    body("team").optional().notEmpty().withMessage("Team is required"),
  ],
  async (req: Request<{ id: string }>, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }

    try {
      const { name, description, photo, team } = req.body
      const updateData = { name, description, photo, team }
      const updatedMember = await Member.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true },
      )
      if (!updatedMember) {
        return res.status(404).json({ message: "Member not found" })
      }
      res.status(200).json(updatedMember)
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message })
      } else {
        res.status(500).json({ message: "An unknown error occurred" })
      }
    }
  },
] as RequestHandler<{ id: string }>[]

// Delete member controller
export const deleteMember = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const member = await Member.findByIdAndDelete(id)
    if (!member) {
      return res.status(404).json({ message: "Member not found" })
    }
    res.status(200).json({ message: "Member deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}
