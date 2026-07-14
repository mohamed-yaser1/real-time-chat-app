import Chat from "../models/chat.model";
import User from "../models/user.model";
import { NotFoundException } from "../utils/appError";
import { createSchemaType } from "../validators/chat.validator";


export const createChatService = async(userId:string,body:createSchemaType) => {
    const {groupName,isGroup,participantId,participants} = body
    let chat;
    let allParticipantsIds:string[] = []

    if(isGroup && participants?.length && groupName){
        allParticipantsIds = [userId , ...participants];
        chat = await Chat.create({participants:allParticipantsIds,isGroup:true,groupName,createdBy:userId});
    }
    else if(participantId){
        const otherUser = await User.findById(participantId);
        if(!otherUser) throw new NotFoundException("User not found");
        const existingChat = await Chat.findOne({
            participants:{$all:allParticipantsIds}
        })
        if(existingChat) return existingChat;

        chat = await Chat.create({
            participants:allParticipantsIds,
            isGroup:false,
            createdBy:userId
        })
    }
}