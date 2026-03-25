import { Router } from "express";
import { getUserProfile } from "./users.service.js";
import { SuccessResponse } from "../../common/utils/response/success.responce.js";

const router = Router();

// route to get public user profile by id for the share link
router.get('/:id', async (req, res, next) => {
    try {
        const user = await getUserProfile(req.params.id);
        return SuccessResponse({ res, message: 'User retrieved successfully', status: 200, data: user });
    } catch (error) {
        next(error);
    }
});

export default router;
