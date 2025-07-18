import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: false,   // ⬅️ Password is now optional (for Google login users)
        minlength: 6,
    },
}, {
    timestamps: true,
});

export default mongoose.model('User', userSchema);
