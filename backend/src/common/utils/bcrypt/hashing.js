import bcrypt from 'bcrypt';
import { salt } from '../../../../config/env.service.js';



// Function to hash a password
export const hashPassword = async (password)=>{
        const hashPasssword = await bcrypt.hash(password , +salt)
        return hashPasssword
}



// Function to compare a plain password with a hashed password
export const comparePassword = async (password, hashedPassword)=>{
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
}