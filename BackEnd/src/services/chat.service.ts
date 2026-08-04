import { emitNewChatToParticipants } from "../lib/socket";
import Chat from "../models/chat.model";
import Message from "../models/message.model";
import User from "../models/user.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
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

        const populatedChat = await chat?.populate('participants','name avatar');
        const participantIdsStrings = populatedChat.participants.map(p => p._id?.toString());

        emitNewChatToParticipants(participantIdsStrings,chat)

        return chat;
    }
}

export const getUsersChatsService = async(userId:string) => {
    const chats  = await Chat.find({
        participants:{
            $in:[userId]
        }
    }).populate("participants","name avatar")
      .populate({
        path:'lastMessage',
        populate:{
            path:"sender",
            select:"name avatar"
        }
      }).sort({updatedAt:-1});

      return chats
}

export const getSingleChatService = async (chatId:string,userId:string) => {
    const chat = await Chat.findOne({
        _id:chatId,
        participants:{
            $in:[userId]
        }
    })
    if(!chat) throw new BadRequestException("chat not found ");

    const messages = Message.findOne({chatId})
    .populate("sender","name avatar")
    .populate({
        path:"replyTo",
        select:'content image sender',
        populate:{
            path:'sender',
            select:"name avatar"
        }
    })
    .sort({createdAt:1});
    return {
        chat,messages
    }
}

export const validateChatParticipants = async (chatId:string,userId:string) => {

        const chat = await Chat.findOne({
            _id:chatId,
            participants:userId
        })
        if(!chat) throw new Error('user not a participant in this chat')
    
        return chat
}