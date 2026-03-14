import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "..", "uploads")
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname
        const ext = path.extname(file.originalname)
        cb(null, `report-${uniqueName}${ext}`)
    }
})

const upload = multer({ storage: storage })
export default upload