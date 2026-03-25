import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 1000
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isSeen: {
        type: Boolean,
        default: false
    },
    isDeletedByReceiver: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const messageModel = mongoose.model('Message', messageSchema);
