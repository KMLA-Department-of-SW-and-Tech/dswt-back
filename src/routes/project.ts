import express from "express"
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project"

const router = express.Router()

router.route("/:id").get(getProjects).put(updateProject).delete(deleteProject)
router
  .route("/:id/detail")
  .get(getProjects)
  .put(updateProject)
  .delete(deleteProject)

router.post("/", createProject)
export default router
