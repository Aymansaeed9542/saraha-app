import { userModel } from "../../database/models/user.model.js";
import { NotFoundException } from "../../common/utils/response/error.responce.js";

// getUserProfile function to get public user data by their ID
export const getUserProfile = async (id) => {
    const user = await userModel.findById(id).select("userName gender");
    
    if (!user) {
        NotFoundException({ message: "User not found" });
    }
    
    return user;
}

// updateUserProfilePicture function to update the user's avatar
export const updateUserProfilePicture = async (userId, imageUrl) => {
    const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { profilePicture: imageUrl },
        { new: true }
    );

    if (!updatedUser) {
        NotFoundException({ message: "User not found" });
    }

    return updatedUser;
}
