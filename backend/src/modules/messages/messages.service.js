import { messageModel } from "../../database/models/message.model.js";
import { userModel } from "../../database/models/user.model.js";
import { NotFoundException, ForbiddenException } from "../../common/utils/response/error.responce.js";

// send message service
export const sendMessage = async (data) => {
    const { content, receiverId } = data;

    // check if receiver exists
    const receiver = await userModel.findById(receiverId);
    if (!receiver) {
        return NotFoundException({ message: "login first to send message" });
    }

    // create new message
    const newMessage = await messageModel.create({
        content,
        receiverId
    });

    return newMessage;
};

// get user messages service
export const getUserMessages = async (userId) => {
    const messages = await messageModel.find({ 
        receiverId: userId, 
        isDeletedByReceiver: false 
    }).sort({ createdAt: -1 });

    return messages;
};

// delete message service
export const deleteMessage = async (messageId, userId) => {
    const message = await messageModel.findById(messageId);

    if (!message) {
        return NotFoundException({ message: "Message not found" });
    }

    // check if the user is the receiver
    if (message.receiverId.toString() !== userId.toString()) {
        return ForbiddenException({ message: "You are not authorized to delete this message" });
    }

    // soft delete: mark as deleted by receiver
    message.isDeletedByReceiver = true;
    await message.save();


    return { message: "Message deleted successfully" };
};
