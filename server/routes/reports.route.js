import express from "express"
import { protectedRoute } from "../middlewares/protectedRoute.js"
import { createReport, createReportsByCsv, getReportById, getReports } from "../controllers/reports.controllers.js"
import upload from "../middlewares/uploadImage.js"

const router = express.Router()

router.post("/", protectedRoute, upload.single("image"), createReport)
router.get("/", protectedRoute, getReports)
router.get("/:id", protectedRoute, getReportById)
router.post("/csv", protectedRoute, upload.single("csvfile"), createReportsByCsv)

export default router
