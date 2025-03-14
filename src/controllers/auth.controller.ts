import { z } from "zod";
import catchErrors from "../utils/catch-errors";
import { password } from "bun";
import { createAccount } from "../services/auth.service";
import { BAD_REQUEST, OK } from "../config/http-status-code";
import { setAuthCookie } from "../utils/cookies";

const RegisterSchema = z
.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(1).max(255),
    confirmPassword: z.string().min(1).max(255),
    userAgent: z.string().optional()
})
.refine(
    (data) => data.password === data.confirmPassword, {
        message: "Password do not match",
        path: ["confirmPassword"]
    }
)

const regsiterHandler = catchErrors(
    async (req,res,next) => {
        // validate the request
        const request = RegisterSchema.parse({
            ... req.body,
            userAgent: req.headers["user-agent"]
        })

        // call service
        const {accessToken,refreshToken,user} = await createAccount(request)

        // return response
        console.log("Get the data", {accessToken,refreshToken,user} )
        return setAuthCookie({res, accessToken: accessToken, refreshToken: refreshToken})
        .status(OK)
        .json(user)
}
)

export {regsiterHandler}