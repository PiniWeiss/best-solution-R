import fs from "fs"
import Report from "../modules/report.model.js"
import User from "../modules/user.module.js"
import csv from 'csv-parser'

export const createReport = async (req, res) => {
    try {
        const { category, urgency, message } = req.body
        const user = req.user
        const image = req.file

        if (!category || !urgency || !message) return res.status(401).json({ error: "One Of The Fields IS Missing" })
        let imagePath = ""
        if (image) { imagePath = req.file.destination }

        const newReport = await new Report({
            userId: user._id,
            category,
            urgency,
            message,
            imagePath: imagePath,
            sourceType: "form"
        })
        await newReport.save()

        res.status(201).json(newReport)

    } catch (error) {
        console.log("Error on createPost controller")
        res.status(500).json({ error: error.message })
    }
}

export const getReports = async (req, res) => {
    try {
        const filter = req.query
        let reports = await Report.find();
        if (filter.category) {
            reports = reports.filter(r => r.category === filter.category)
        }
        if (filter.urgency) {
            reports = reports.filter(r => r.urgency === filter.urgency)
        }
        if (filter.agentCode) {
            const agent = await User.findOne({ agentCode: filter.agentCode })
            reports = reports.filter(r => r.userId.toString() === agent._id.toString())
        }

        if (req.user.role === "agent") {
            reports = reports.filter(r => {
                return r.userId.toString() === req.user._id.toString()
            })
        }

        res.status(200).json(reports)
    } catch (error) {
        console.log("Error on getReports controller")
        res.status(500).json({ error: error.message })

    }
}
export const getReportById = async (req, res) => {
    try {
        const { id } = req.params

        const report = await Report.findById(id)

        if (report.userId !== req.user._id && req.user.role !== "admin") {
            return res.status(403).json({ error: "Unauthorized User" })
        }

        if (!report) return res.status(404).json({ error: "Report Not Found" })
        res.status(200).json(report)
    } catch (error) {
        console.log("Error on getReportById controller")
        res.status(500).json({ error: error.message })

    }
}

export const createReportsByCsv = (req, res) => {
    try {
        const results = []

        if (!req.file) {
            return res.status(400).json({ error: "CSV file not uploaded" })
        }

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", (data) => results.push({
                ...data,
                userId: req.user._id,
                sourceType: "csv"
            }))
            .on("end", async () => {
                try {
                    await Report.insertMany(results)
                    if (req.file && req.file.path) { fs.unlinkSync(req.file.path) }
                    res.status(200).json({
                        message: "success",
                        number_of_reports: results.length
                    })
                } catch (dbError) {
                    res.status(500).json({ error: dbError.message })
                }
            })
    } catch (error) {
        console.log("Error on createReportsByCsv controller")
        res.status(500).json({ error: error.message })

    }
}