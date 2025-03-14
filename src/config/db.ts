import mongoose from "mongoose"
import env from "./env-config";


const connectDb = async ():Promise<void> => {
    try {
        const connection = await mongoose.connect(env.MONGODB_URI);

        if(!connection) {
            console.log("\n\nSomething went wrong will connecting to DB\n\n");
            return;
        }
        
        console.log("DB connected: ",connection.connection.name);

    } catch (error) {
        console.log("Could not connect to db",error);
        process.exit(1);
    }
}

export default connectDb
