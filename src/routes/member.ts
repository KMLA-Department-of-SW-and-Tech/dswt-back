import express from "express"
import {
    getMember,
    createMember,
    putMember,
    deleteMember
} from "../controllers/member"

const router = express.Router()

router.route("/:id").get(getMember).put(updateMember).delete(deleteMember)
router
    .route("/:id/detail")
    .get(getMember)
    .put(updateMember)
    .delete(deleteMember)

export default router

