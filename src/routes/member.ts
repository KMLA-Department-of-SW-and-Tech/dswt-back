import express from "express"
import {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/member"
import authenticateToken from "../middlewares/verifyToken"

const router = express.Router()

router
  .route("/:id")
  .get(getMember)
  .put(authenticateToken, updateMember)
  .delete(authenticateToken, deleteMember)

router.route("/").get(getMembers).post(authenticateToken, createMember)
export default router
