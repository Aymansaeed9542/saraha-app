import { Router } from "express";
import { googleLogin, logIn, signUp } from "./auth.service.js";
import { SuccessResponse } from "../../common/utils/response/success.responce.js";
import { validation } from "../../common/utils/validation/validation.js";
import { googleLoginSchema, loginSchema, signupSchema } from "../../validation/auth.validation.js";
import { auth } from "../../common/middleware/auth.middleware.js";



const router = Router() 
// route to sign upu a new user
router.post('/signup', validation(signupSchema), async (req, res) => {
    const addUser = await signUp(req.body)
    // return a success response with the added user data
    return SuccessResponse({ res, message: 'user added successfully', status: 201, data: addUser })
})


// route to log in a user
router.post('/login', validation(loginSchema), async (req, res) => {
    const user = await logIn(req.body)

    return SuccessResponse({ res, message: 'user logged in successfully', status: 200, data: user })
})


// route to log in with google
router.post('/google', validation(googleLoginSchema), async (req, res) => {
    const user = await googleLogin(req.body.token)

    return SuccessResponse({ res, message: 'user logged in successfully', status: 200, data: user })
})

// route to get current user profile
router.get('/me', auth, async (req, res) => {
    // exclude password from response
    const userProfile = {
        _id: req.user._id,
        userName: req.user.userName,
        email: req.user.email,
        gender: req.user.gender,
        phone: req.user.phone,
        provider: req.user.provider
    };
    return SuccessResponse({ res, message: 'User profile retrieved successfully', status: 200, data: userProfile });
})


export default router
