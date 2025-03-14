import type { ErrorRequestHandler, Response } from "express"
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../config/http-status-code";
import { z } from "zod";


const handleZodErrors = (res:Response,error:z.ZodError) => {
    const errors = error.issues.map((err) => (
        {
            path: err.path.join(","),
            message: err.message
        }
    ));

    return res.status(BAD_REQUEST).json({
        message: error.message,
        errors
    })
}

const errorHandler:ErrorRequestHandler = (error,req,res,next) => {
    console.log(`PATH: ${req.path}`,error);

    if(error instanceof z.ZodError){
        return handleZodErrors(res,error);
    }

    res.status(INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error"
    })
}

export default errorHandler