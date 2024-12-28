import express from "express"
import {
  getMember,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/member"
import authenticateToken from "../middlewares/verifyToken"

const router = express.Router()

router.route("/:id").get(getMember).put(authenticateToken, updateMember).delete(authenticateToken, deleteMember)

router.post("/", authenticateToken, createMember)
export default router
