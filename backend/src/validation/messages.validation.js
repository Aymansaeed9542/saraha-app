import Joi from 'joi';

// objectId validation helper
const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
};

// send message validation schema
export const sendMessageSchema = Joi.object({
    content: Joi.string().min(1).max(1000).required().messages({
        'string.empty': 'content is required',
        'string.min': 'message cannot be empty',
        'string.max': 'message is too long (max 1000 characters)',
    }),
    receiverId: Joi.string().custom(objectId).required().messages({
        'string.empty': 'receiverId is required',
    }),
}).required();

// delete message validation schema
export const deleteMessageSchema = Joi.object({
    id: Joi.string().custom(objectId).required().messages({
        'string.empty': 'message id is required',
    }),
}).required();
