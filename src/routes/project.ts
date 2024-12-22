import express from "express"
import {
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project"

const router = express.Router()

router.route("/:id").get(getProject).put(updateProject).delete(deleteProject)
router
  .route("/:id/detail")
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject)

router.post("/", createProject)
export default router
