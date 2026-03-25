import { Router } from "express";
import { auth } from "../../common/middleware/auth.middleware.js";
import { validation } from "../../common/utils/validation/validation.js";
import { SuccessResponse } from "../../common/utils/response/success.responce.js";
import { deleteMessage, getUserMessages, sendMessage } from "./messages.service.js";
import { deleteMessageSchema, sendMessageSchema } from "../../validation/messages.validation.js";

const router = Router();

// route to send a message
router.post('/', validation(sendMessageSchema), async (req, res) => {
    const result = await sendMessage(req.body);
    return SuccessResponse({ res, message: 'Message sent successfully', status: 201, data: result });
});

// route to get all messages
router.get('/', auth, async (req, res) => {
    const messages = await getUserMessages(req.user._id);
    return SuccessResponse({ res, message: 'Messages retrieved successfully', status: 200, data: messages });
});

// route to delete a message
router.delete('/:id', auth, validation(deleteMessageSchema), async (req, res) => {
    const result = await deleteMessage(req.params.id, req.user._id);
    return SuccessResponse({ res, message: result.message, status: 200 });
});

export default router;
