import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../../config/env.service.js';
import { userModel } from '../../database/models/user.model.js';
import { UnauthorizedException, NotFoundException } from '../utils/response/error.responce.js';

export const auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        // check if authorization header is provided
        if (!authorization) {
            return UnauthorizedException({ message: "Authorization header is required" });
        }

        // check if it's a Bearer token
        if (!authorization.startsWith('Bearer ')) {
            return UnauthorizedException({ message: "Invalid token format (Bearer token required)" });
        }

        const token = authorization.split(' ')[1];

        // verify the token
        const decoded = jwt.verify(token, jwtSecret);

        // check if the user still exists in the database
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return NotFoundException({ message: "User not found or deleted" });
        }

        // attach the user to the request
        req.user = user;
        next();
    } catch (error) {
        return UnauthorizedException({ message: "Invalid or expired token", extra: error });
    }
}
