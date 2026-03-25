import { googleClientId, jwtSecret } from "../../../config/env.service.js"
import { comparePassword, hashPassword } from "../../common/utils/bcrypt/hashing.js"
import { ConflictException } from "../../common/utils/response/error.responce.js"
import { userModel } from "../../database/models/user.model.js"
import jwt from 'jsonwebtoken'
import { OAuth2Client } from "google-auth-library"
import { providerEnums } from "../../common/enums/enum.service.js"

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
    const hashPasssword = await hashPassword(password)
    // create a new user in the database
    let addUser = await userModel.create({userName, email , password:hashPasssword, gender,phone})

    const token = jwt.sign({id:addUser._id}, jwtSecret, {expiresIn:'7d'})

    return {userName: addUser.userName, email: addUser.email , token}

}


// login function
export const logIn = async(data,)=>{
    // destructure the email and password from the request body
const {email , password} = data



// check if the user exists in the database
const existsUser = await userModel.findOne({email})
if(!existsUser){
    ConflictException({message:'invalid email or password'})
}
if(!await comparePassword(password, existsUser.password)){
    ConflictException({message:'invalid email or password'})
}
const generatedtoken = jwt.sign({id:existsUser._id}, jwtSecret, {expiresIn:'7d'})





return {userName: existsUser.userName, email: existsUser.email, token:generatedtoken}
}


// googleLogin function
export const googleLogin = async (idToken) => {
    const client = new OAuth2Client(googleClientId);

    // verify the google ID token
    const ticket = await client.verifyIdToken({
        idToken,
        audience: googleClientId,
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // check if the user already exists
    let user = await userModel.findOne({ email });

    if (!user) {
        // if user does not exist, create a new one
        user = await userModel.create({
            userName: name,
            email: email,
            password: 'google_login_no_password', // placeholder password
            provider: providerEnums.Google
        });
    }

    // generate JWT token
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });

    return { userName: user.userName, email: user.email, token };
}
