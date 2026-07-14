import { HTTPSTATUS , HTttpStatusCodeType } from "../config/http.config";


export const ErrorCodes = {
    ERR_INTERNAL: "ERR_INTERNAL",
    ERR_BAD_REQUEST: "ERR_BAD_REQUEST",
    ERR_UNAUTHORIZED: "ERR_UNAUTHORIZED",
    ERR_FORBIDDEN: "ERR_FORBIDDEN",
    ERR_NOT_FOUND: "ERR_NOT_FOUND",
} as const;

export type ErrorCodeType = keyof typeof ErrorCodes
// export type HTttpStatusCodeType = (typeof HTTPSTATUS)[keyof typeof HTTPSTATUS];


export class AppError extends Error{
    constructor(
        message:string,
        public statusCode:HTttpStatusCodeType = HTTPSTATUS.INTERNAL_SERVER_ERROR,
        public errorCode:ErrorCodeType = ErrorCodes.ERR_INTERNAL
    )
    {
        super(message);
        Error.captureStackTrace(this);
    }
}

export class InternalServerError extends AppError{
    constructor(message:string = 'internal server Error')
    {
        super(message,HTTPSTATUS.INTERNAL_SERVER_ERROR,ErrorCodes.ERR_INTERNAL)
    }
}

export class NotFoundException extends AppError{
    constructor(message:string = 'resoursse not found'){
        super(message,HTTPSTATUS.NOT_FOUND,ErrorCodes.ERR_NOT_FOUND)
    }
}

export class BadRequestException extends AppError{
    constructor(message='Bad Request'){
        super(message,HTTPSTATUS.BAD_REQUEST,ErrorCodes.ERR_BAD_REQUEST)
    }
}

export class UnAuthorizedException extends AppError{
    constructor(message='unAuthorized Access'){
        super(message,HTTPSTATUS.UNAUTHORIZED,ErrorCodes.ERR_UNAUTHORIZED)
    }
}