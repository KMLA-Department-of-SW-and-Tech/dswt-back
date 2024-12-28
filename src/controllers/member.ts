import Member from "../models/member"
import {Request, Response, RequestHandler} from "express"
import { body, validationResult } from "express-validator"

export const getMember = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const member = await Member.find({ id: req.params.id })
        res.status(200).json(member)
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message})
        } else {
            res.status(500).json({ message: "An unknown error occurred"})
        }
    }
}

export const createMember = [
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("photo").notEmpty().withMessage("Photo is required"),
        body("team").notEmpty().withMessage("Team is required")
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }

        try {
            const { name, description, photo, team } = req.body
            const newMemberData = {
                name,
                description,
                photo,
                team
            }

            const newMember = new Member(newMemberData)
            await newMember.save()
            res.status(201).json(newMember)
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: "An unknown error occurred" })
            }
        }
    }
] as RequestHandler[]