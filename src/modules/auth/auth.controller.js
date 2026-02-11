import { Router } from "express";
import { signUp } from "./auth.service.js";
import { SuccessResponse } from "../../common/utils/response/success.responce.js";


const router = Router()

router.post('/signUp',async(req,res)=>{
    const addUser = await signUp(req.body)
    return SuccessResponse({res, message:'user added successfully',status:201,data: addUser})
})

export default router