import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    UserEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    UserAge: {
        type: Number,
        required: true
    },
    UserGender: {
        type: String,
        required: true
    }
}, { timestamps: true });

const UserMode = mongoose.model("TaskData", UserSchema);

export default UserMode;