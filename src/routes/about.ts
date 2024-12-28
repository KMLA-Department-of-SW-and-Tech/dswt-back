import express from "express"
import {
    getIntroduction,
    updateAbout,
    deleteAbout
} from "../controllers/about"

const router = express.Router()

router.route("/:id").get(getIntroduction).put(updateAbout).delete(deleteAbout)
router
    .route("/:id/detail")
    .get(getIntroduction)
    .put(updateAbout)
    .delete(deleteAbout)

export default router