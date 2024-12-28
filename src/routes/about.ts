import express from "express"
import {
    getIntroduction,
    updateAbout,
    deleteAbout
} from "../controllers/about"
import authenticateToken from '../middlewares/verifyToken'

const router = express.Router()

router.route("/:id").get(getIntroduction).put(authenticateToken, updateAbout).delete(authenticateToken, deleteAbout)
router
    .route("/:id/detail")
    .get(getIntroduction)
    .put(updateAbout)
    .delete(deleteAbout)

export default router