import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";
import { ZodError } from "zod";

export const errorHandler:ErrorRequestHandler = (err,req,res,next) => {
    console.log(`Error occurred in ${req.path} , ${err}`)
    if(err instanceof AppError){ // Operational Errors (Expected Errors)
        return res.status(err.statusCode).json({
            message:err.message,
            errorCode:err.errorCode
        })
    }
   if (err instanceof ZodError) {
    console.log("mmmmmmmmmm");
    console.log(err.errors);

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation error",
    errors: err.flatten().fieldErrors,
  });
}


    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message:'internal server Error',
        error:err?.message || 'something went wrong'
    })
}

// export const errorHandler: ErrorRequestHandler = (
//   err,
//   req,
//   res,
//   next
// ) => {
//   console.log("ERROR =", err);
//   console.log("REQ TYPE =", typeof req);
//   console.log("RES TYPE =", typeof res);
//   console.log("RES =", res);

//   return res.status(500).json({
//     message: "test"
//   });
// };