import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDb from "./config/db";
import env from "./config/env-config";
import { OK } from "./config/http-status-code";
import errorHandler from "./middlewares/error-handler";
import catchErrors from "./utils/catch-errors";

// Routes Imports
import authRouter from "./routes/auth.route";

// Env variable
const PORT = env.PORT
const NODE_ENV = env.NODE_ENV

const app = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors({
    //TODO: need to add ORIGIN_URL of our frontend
    origin: `*`,
    credentials: true
}))
app.use(cookieParser())




app.get("/",catchErrors(async (req,res,next) => {
        return res.status(OK).json({
            message: "Healthy"
        })
}))


app.use("/auth",authRouter)

/// Error handler middleware

app.use(errorHandler)

connectDb().then(() => app.listen(PORT,() => {
    console.log(`Server is running : http://localhost:${PORT} in ${NODE_ENV} environment `)
})
).catch(() => process.exit(1))
