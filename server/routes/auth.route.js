import express from 'express'
import { getUser, login, logout } from '../controllers/auth.controller.js'
import { protectedRoute } from '../middlewares/protectedRoute.js'

const router = express.Router()

router.post("/login", login)
router.get("/me", protectedRoute, getUser)
router.get("/logout", protectedRoute, logout)

export default router