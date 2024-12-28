import About from "../models/about"
import { Request, Response, RequestHandler } from "express"
import { body, validationResult } from "express-validator"

export const getIntroduction = async (req: Request, res: Response) => {
    try {
        const aboutIntroduction = await About.find({}, "introduction")
        res.status(200).json(aboutIntroduction)
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: "An unknown error occurred" })
        }
    }
}

export const updateAbout = [
    [
        body("introduction").notEmpty().withMessage("Title is required")
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }

        try {
            const { introduction } = req.body
            const updateData = { introduction }

            const updatedAbout = await About.findOneAndUpdate(
                {},
                updateData,
                {
                    new: true,
                    upsert: true,
                }
            )
            if (!updatedAbout) {
                res.status(404).json({ message: "About not found" })
            }
            res.status(200).json(updatedAbout)
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: "An unknown error occured" })
            }
        }
    }
] as RequestHandler[]

export const deleteAbout = async (
    req: Request,
    res: Response
) => {
    try {
        const deletedAbout = await About.findOneAndDelete({})
        if (!deletedAbout) {
            res.status(404).json({ message: "About not found" })
        }
        res.status(200).json({ message: "About deleted successfully" })
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: "An unknown error occurred" })
        }
    }
}

