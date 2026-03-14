import express from 'express'
import { createUser, getUsers } from '../controllers/user.controllers.js'
import { protectedRoute } from '../middlewares/protectedRoute.js'

const router = express.Router()

router.post("/users", protectedRoute, createUser)
router.get("/users", protectedRoute, getUsers)

export default router 