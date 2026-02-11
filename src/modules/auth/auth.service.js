import { userModel } from "../../database/models/user.model.js"

export const signUp = async(data)=>{
    let {userName, email , password} = data
    let existUser = await userModel.findOne({email})
    if (existUser) {
        res.json({message:'user aleady exists'})
    }
    let addUser = await userModel.insertOne({userName, email , password})
    return addUser
}