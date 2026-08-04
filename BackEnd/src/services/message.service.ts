import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.config";
import Chat from "../models/chat.model";
import Message from "../models/message.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import { createMessgeType } from "../validators/message.validator";
import { emitlastMessageToParticipants, emitNewMessageToChatRoom } from "../lib/socket";

export const createMessageService = async (userId:string,body:createMessgeType) => {
    const {chatId,content,image,replyToId} = body

    const chat = await Chat.findOne({
        _id:chatId,
        participants:{
            $in:[userId]
        }
    })

    if(!chat) throw new BadRequestException("chat not found");
    if(replyToId){
        const messageReplayedTo = await Message.findOne({
            _id:replyToId,
            chatId
        })
        if(!messageReplayedTo) throw new NotFoundException("replayed message was not found");
    }
    let imageUrl;
    if(image){
        //upload to cloud storage
        const uploadRes = await cloudinary.uploader.upload(image)
        imageUrl = uploadRes.secure_url;
    }
    const newMessage = await Message.create({
        chatId,
        sender:userId,
        content,
        imageUrl,
        replyTo:replyToId || null
    })

    await newMessage.populate([
        {path:'sender',select:"name avatar"},
        {
            path:"replyTo",
            select:'content image sender',
            populate:{
                path:"sender",
                select:'email avatar'
            }
        }
    ])

    chat.lastMessage = newMessage._id as mongoose.Types.ObjectId;
    await chat.save()

    //websocket

    emitNewMessageToChatRoom(userId,chatId,newMessage);

    const allParticipantsIds = chat.participants.map(id => id.toString())
    emitlastMessageToParticipants(allParticipantsIds,chatId,newMessage);

    return {
        newMessage,
        chat
    }

}

/*
    await Post.updateOne(
        {_id:postID},
        {
            $pull:{
                comments:{_id:commentID}
            }
        }
    )

    await Course.updateOne(
        {
            _id:courseId,
            'students.studetId':studentId
        },
        {
            $addToSet:{
                "students.$.completedLessons":lessonId
            }
        }
    )

    await Post.findById(postID).populate({
        path:'author,
        populate:{path:'company',select:'name'}
    })

    { $match: { createdAt: { $gte : thirtyDaysAgo } } }
    Message.aggregate([
        {$match:{createdAt:{$gte:thrtyDayesAgo}}}
        { $group: { _id:senderId, messageCount: {count:1} } },
        {$sort:{messageCount:-1}}
        {$limit:5},
        {$lookup:{from:'users',localField:'_id',foreignField:'_id',as:'senderInfo'}},
        {$unwind:senderInfo}
    ]
*/