
import UserMode from "../models/DemoModel.js";

// POST: Add User
export const CollectData = async (req, res) => {
    try {
        const { UserName, UserEmail, UserAge, UserGender } = req.body;

        // Validate required fields
        if (
            !UserName?.trim() ||
            !UserEmail?.trim() ||
            UserAge === "" ||
            UserAge === undefined ||
            UserAge === null ||
            !UserGender?.trim()
        ) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }

        // Convert age to number
        const age = Number(UserAge);

        if (!Number.isFinite(age) || age < 1) {
            return res.status(400).json({
                success: false,
                msg: "Please enter a valid age"
            });
        }

        // Check duplicate email
        const email = UserEmail.trim().toLowerCase();

        const existingUser = await UserMode.findOne({
            UserEmail: email
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                msg: "Email already exists. Please use another email."
            });
        }

        // Create new user
        const newData = await UserMode.create({
            UserName: UserName.trim(),
            UserEmail: email,
            UserAge: age,
            UserGender: UserGender.trim()
        });

        return res.status(201).json({
            success: true,
            msg: "Data Added Successfully",
            data: newData
        });

    } catch (error) {
        console.error("CollectData Error:", error);

        // Handle duplicate email database error
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                msg: "Email already exists. Please use another email."
            });
        }

        return res.status(500).json({
            success: false,
            msg: "Failed to add data. Please try again."
        });
    }
};


// GET: Fetch All Users
export const GetData = async (req, res) => {
    try {
        const users = await UserMode.find();

        return res.status(200).json({
            success: true,
            count: users.length,
            Mydata: users
        });

    } catch (error) {
        console.error("GetData Error:", error);

        return res.status(500).json({
            success: false,
            msg: "Failed to fetch data"
        });
    }
};
