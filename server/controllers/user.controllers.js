import User from "../modules/user.module.js"
import bcrypt from 'bcryptjs'

export const createUser = async (req, res) => {
    try {
        const { fullName, agentCode, role, password } = req.body
        if (!fullName || !agentCode || !password) return res.status(400).send("All fields need to be fill.")

        const user = await User.findOne({ agentCode });
        if (user) {
            return res.status(400).json({ error: `${agentCode} already exists` });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await new User({
            fullName,
            agentCode,
            role,
            password: hashPassword
        })
        await newUser.save()

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            agentCode: newUser.agentCode,
            role: newUser.role
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error on the createUser controller")
    }
}

export const getUsers = async (req, res) => {
    try {
        const currentUser = req.user
        if (currentUser.role !== "admin") return res.status(403).json({ error: "Unauthorized You Are not Admin" })
        const users = await User.find()
        res.status(200).json({ users: users })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error on the getUsers controller")

    }
}