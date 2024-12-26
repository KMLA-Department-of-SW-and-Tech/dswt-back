import express from "express"
import {
    getAbout,
    createAbout,
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

router.post("/", createAbout)
export default router