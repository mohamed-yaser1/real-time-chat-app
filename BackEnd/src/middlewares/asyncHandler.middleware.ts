import {Request,Response,NextFunction} from 'express'

type AsyncController = (
    req:Request,
    res:Response,
    next:NextFunction
) => Promise<any>

export const asyncHandler = (controller:AsyncController) => {
    return async (req:Request , res:Response , next:NextFunction) => {
        try{
            await controller(req,res,next);
        }
        catch(err){
            next(err)
        }
    }
}

/*
Chat.findOne({
    _id:chatID,
    partricipants:{
        $in:[userId]
    }
})
    /////////////////

chat.findOne({
    _id:chatID,
    isGroup:true,
    participants:{
        $gt:2
    }
})

const user = awit User.findById(req.user._id);
const isBlockedTargted = user.blockedUsers.some(a => a.equals(targetUserId))

Chat.findOne({
    _id:chatId,
    participants:{
        userId:{
            $in:[userId],
            role:''admin
        }
    }
})

const post = Post.findById(postId);
const likedPost = post.likes.some(p => p.equals(req.user._id));

chat.findOne({
    _id:chatId,
    participants:{
        $elemMatch:{userID:userId,role:'admin}
    }
})
    chat.findOne({
        _id:chatId,
        mutedBy:{
            $nin:[userId]
        },
        participants:{
            $in:[userID]
        }
    })


    await Post.updateOne(
        {_id:postID},
        {$addToSet:req.user._id}
    )

    await Chat.updateOne(
        {_id:chatId},
        {$pull:req.user._id}
    )

    await Chat.updateOne(
        {_id:chatId},
        {$set:{"messages.$["de"}.delivered}},

    )

    await Chat.updateOne(
  { _id: chatId, "messages._id": messageId },
  { $set: { "messages.$.delivered": true } }
)
////////////////////////////////////////

    await Post.updateOne(
        {_id:postID},
        {$push:{tags:tagID}}
    )

    await Course.updateOne(
        {_id:courseId},
        {$pull:{enrolledCourses:couseID}}
    )

    await User.updateOne(
        {_id:userId},
        {$push:{skills:'skill'}}
    )

    await Order.updateOne(
        {_id:orderId},
        items:{
            {productyId:productID},
            {$inc:{quantity:1}}
        }
    )


    await Post.updateOne(
        {
            _id:poostID,
            'comments._id':commentID
        },
        {
            $set:{
                comments.$.texr:req.body.comment,
                comments.$.edited:true
            }
        }
    )

*/