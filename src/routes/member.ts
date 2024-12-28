import express from "express"
import {
  getMember,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/member"

const router = express.Router()

router.route("/:id").get(getMember).put(updateMember).delete(deleteMember)

router.post("/", createMember)
export default router
