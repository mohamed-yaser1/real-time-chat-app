export type RegisterPayload = {
    name:string;
    email:string;
    password:string;
    avatar?:string;
}

export type LoginPayload = {
    email:string;
    password:string
}

export interface User {
    _id:string;
    name:string;
    email:string;
    avatar?:string|null;
    createdAt:Date;
    updatedAt:Date
}