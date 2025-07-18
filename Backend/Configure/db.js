import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED SUCCESSFULLY!")
    } catch (error) {
        console.log("Error connnecting to mongodb", error)
        process.exit(1)  // exit with failure
    }
}