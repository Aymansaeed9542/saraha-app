import { ConflictException } from "../../common/utils/response/error.responce.js"
import { userModel } from "../../database/models/user.model.js"

// signUp function to create a new user in the database
export const signUp = async(data)=>{


    // destructure the user data from the request body
    let {userName, email , password , gender,phone} = data

    // check if the user already exists in the database
    let existUser = await userModel.findOne({email})
    if (existUser) {
        ConflictException({message:'user aleady exists'})
    }
    // create a new user in the database
    let addUser = await userModel.create({userName, email , password, gender,phone})
    return addUser
}

// login function
export const logIn = async(data)=>{
const {email , password} = data

const existsUser = await userModel.findOne({email})
if(!existsUser){
    ConflictException({message:'invalid email or password'})
}

return existsUser

}