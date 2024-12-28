import express from "express"
import {
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project"
import authenticateToken from "../middlewares/verifyToken"

const router = express.Router()

router
  .route("/:id")
  .get(getProject)
  .put(authenticateToken, updateProject)
  .delete(authenticateToken, deleteProject)
router
  .route("/:id/detail")
  .get(getProject)
  .put(authenticateToken, updateProject)
  .delete(authenticateToken, deleteProject)

router.post("/", createProject)
export default router
