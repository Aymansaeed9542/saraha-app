import { salt } from "../../../config/env.service.js"
import { ConflictException } from "../../common/utils/response/error.responce.js"
import { userModel } from "../../database/models/user.model.js"
import bcrypt from 'bcrypt'

// signUp function to create a new user in the database
export const signUp = async(data)=>{

    // destructure the user data from the request body
    let {userName, email , password , gender,phone} = data

    // check if the user already exists in the database
    let existUser = await userModel.findOne({email})
    if (existUser) {
    ConflictException({message:'user aleady exists' , status:409})
    }
    // hash the password using bcrypt
    const hashPasssword = await bcrypt.hash(password , +salt)

    // create a new user in the database
    let addUser = await userModel.create({userName, email , password:hashPasssword, gender,phone})
    return {userName: addUser.userName, email: addUser.email }
}




// login function
export const logIn = async(data)=>{
    // destructure the email and password from the request body
const {email , password} = data

// check if the user exists in the database
const existsUser = await userModel.findOne({email})
if(!existsUser){
    ConflictException({message:'invalid email or password'})
}
if(!await bcrypt.compare(password , existsUser.password)){
    ConflictException({message:'invalid email or password'})
}
return {userName: existsUser.userName, email: existsUser.email}
}
