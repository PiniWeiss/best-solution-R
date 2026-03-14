import User from "../modules/user.module.js"
import { generateTokenAndSendToCookie } from "../utils/generateToken.js"

export const login = async (req, res) => {
    try {
        const { agentCode, password } = req.body
        if (!agentCode, !password) return res.status(400).send("agentCode or password missing")

        const user = await User.findOne({ agentCode })
        if (!user) return res.status(401).send("User not found")
        generateTokenAndSendToCookie(user._id, res)
        res.status(200).json({
            userId: user._id,
            fullName: user.fullName,
            agentCode: user.agentCode,
            role: user.role,
        })

    } catch (error) {
        console.log("Error on login controller", error.message)
        res.status(500).json({ error: "Internal server error." })
    }
}
export const getUser = async (req, res) => {
    try {
        const user = req.user

        const userToGet = await User.findOne({ _id: user._id })
        res.status(200).json(userToGet)
    } catch (error) {
        console.log("Error on getUser controller:", error.message)
        res.status(500).json({ error: "Internal server error." })

    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error on getUser controller:", error.message)
        res.status(500).json("Error on logout controller.")
    }
};