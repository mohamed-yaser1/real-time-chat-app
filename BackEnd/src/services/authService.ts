import User from "../models/user.model";
import { NotFoundException, UnAuthorizedException } from "../utils/appError";
import { LoginSchemaType, SignupSchemaType } from "../validators/authValidator";


export const signupService = async (body:SignupSchemaType) => {
    const {email} = body;
    const existingUser =await User.findOne({email});
    if(existingUser) throw new UnAuthorizedException('User already exist');
    const newUser = new User({
        ...body
    })
    await newUser.save();

    return newUser;
}


export const loginService = async (body:LoginSchemaType) => {
    const {email,password} = body;
    const user = await User.findOne({email})
    if(!user) throw new NotFoundException('User not found');
    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) throw new UnAuthorizedException('email or password incorrect');
    return user
}    