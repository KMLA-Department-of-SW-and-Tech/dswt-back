import express from "express"
import {
    getAbout,
    updateAbout,
    deleteAbout
} from "../controllers/about"

const router = express.Router()

router.route("/:id").get(getAbout).put(updateAbout).delete(deleteAbout)
router
    .route("/:id/detail")
    .get(getAbout)
    .put(updateAbout)
    .delete(deleteAbout)

export default router