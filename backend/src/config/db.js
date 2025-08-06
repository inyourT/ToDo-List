import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("data base connected")
    }catch (error){
        console.log("faild",error)
        process.exit(1) //exit with failur
    }
};