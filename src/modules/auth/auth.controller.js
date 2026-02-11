import { Router } from "express";
import { logIn, signUp } from "./auth.service.js";
import { SuccessResponse } from "../../common/utils/response/success.responce.js";


const router = Router() 
// route to sign upu a new user
router.post('/signup',async(req,res)=>{
    const addUser = await signUp(req.body)
    // return a success response with the added user data
    return SuccessResponse({res, message:'user added successfully',status:201,data: addUser})
})

// route to log in a user
router.post('/login', async(req,res)=>{
    const user = await logIn(req.body)
    return SuccessResponse({res, message:'user logged in successfully',status:200,data: user})
})

export default router
