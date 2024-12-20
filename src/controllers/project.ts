import Project from "../models/project"
import { Request, Response, RequestHandler } from "express"
import { body, validationResult } from "express-validator"

export const getProjects = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const projects = await Project.find({ id: req.params.id })
    res.status(200).json(projects)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: "An unknown error occurred" })
    }
  }
}

export const createProject = [
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("shortDescription")
      .notEmpty()
      .withMessage("Short description is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("photos").isArray().withMessage("Photos must be an array"),
    body("updateNotes").isArray().withMessage("Update notes must be an array"),
    body("updateNotes.*.version").notEmpty().withMessage("Version is required"),
    body("updateNotes.*.date")
      .isISO8601()
      .toDate()
      .withMessage("Date must be a valid date"),
    body("updateNotes.*.note").notEmpty().withMessage("Note is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }

    try {
      const { title, shortDescription, description, photos, updateNotes } =
        req.body
      const newProjectData = {
        title,
        shortDescription,
        description,
        photos,
        updateNotes,
      }

      const newProject = new Project(newProjectData)
      await newProject.save()
      res.status(201).json(newProject)
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message })
      } else {
        res.status(500).json({ message: "An unknown error occurred" })
      }
    }
  },
] as RequestHandler[]

export const updateProject = [
  [
    body("title").optional().notEmpty().withMessage("Title is required"),
    body("shortDescription")
      .optional()
      .notEmpty()
      .withMessage("Short description is required"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description is required"),
    body("photos").optional().isArray().withMessage("Photos must be an array"),
    body("updateNotes")
      .optional()
      .isArray()
      .withMessage("Update notes must be an array"),
    body("updateNotes.*.version")
      .optional()
      .notEmpty()
      .withMessage("Version is required"),
    body("updateNotes.*.date")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Date must be a valid date"),
    body("updateNotes.*.note")
      .optional()
      .notEmpty()
      .withMessage("Note is required"),
  ],
  async (req: Request<{ id: string }>, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }

    try {
      const { title, shortDescription, description, photos, updateNotes } =
        req.body
      const updateData = {
        title,
        shortDescription,
        description,
        photos,
        updateNotes,
      }

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true },
      )
      if (!updatedProject) {
        res.status(404).json({ message: "Project not found" })
      }
      res.status(200).json(updatedProject)
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message })
      } else {
        res.status(500).json({ message: "An unknown error occurred" })
      }
    }
  },
] as RequestHandler<{ id: string }>[]

export const deleteProject = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id)
    if (!deletedProject) {
      res.status(404).json({ message: "Project not found" })
    }
    res.status(200).json({ message: "Project deleted successfully" })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: "An unknown error occurred" })
    }
  }
}
