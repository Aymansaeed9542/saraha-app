import Joi from 'joi';

// Egyptian phone number regex
const egyptPhoneRegex = /^(010|011|012|015)[0-9]{8}$/;

// signup validation schema
export const signupSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'userName is required',
    'string.min': 'userName must be at least 3 characters',
    'string.max': 'userName must be at most 30 characters',
  }),
  email: Joi.string().email({ tlds: { allow: ['com', 'net', 'org'] } }).required().messages({
    'string.empty': 'email is required',
    'string.email': 'invalid email format',
  }),
  password: Joi.string().min(8).regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({
    'string.empty': 'password is required',
    'string.min': 'password must be at least 8 characters',
    'string.pattern.base': 'password must contain letters, numbers, and at least one special character (e.g., ayman@123)',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': 'gender must be either male or female',
  }),
  phone: Joi.string().regex(egyptPhoneRegex).optional().messages({
    'string.pattern.base': 'invalid Egyptian phone number format',
  }),
}).required();

// login validation schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'email is required',
    'string.email': 'invalid email format',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'password is required',
  }),
}).required();

// google login validation schema
export const googleLoginSchema = Joi.object({
  token: Joi.string().required().messages({
    'string.empty': 'token is required',
  }),
}).required();
