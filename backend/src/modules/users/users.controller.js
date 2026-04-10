import { Router } from "express";
import { getUserProfile, updateUserProfilePicture } from "./users.service.js";
import { SuccessResponse } from "../../common/utils/response/success.responce.js";
import { auth } from "../../common/middleware/auth.middleware.js";
import { uploadAvatar } from "../../common/middleware/fileUpload.middleware.js";

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

// route to update profile picture
router.patch('/update-avatar', auth, uploadAvatar.single('avatar'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        const imageUrl = req.file.path.replace(/\\/g, "/");
        const userId = req.user._id; // Ensure it uses _id or id based on mongoose schema

        const user = await updateUserProfilePicture(userId, imageUrl);
        return SuccessResponse({ res, message: 'Profile picture updated successfully', status: 200, data: { profilePicture: user.profilePicture } });
    } catch (error) {
        next(error);
    }
});

export default router;
