//Validar datos relacionados a la BD

import { isValidObjectId } from 'mongoose'
import User from '../src/user/user.model.js'
import Company from '../src/company/company.model.js'


export const existEmail = async(email, company)=>{
    const alreadyEmail = await Company.findOne({email}) 
        if(alreadyEmail && alreadyEmail._id != company.uid){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existName = async(name, company)=>{
    const alreadyName = await Company.findOne({name}) 
        if(alreadyName && alreadyName._id != company.uid){
        console.error(`Name ${name} is already taken`)
        throw new Error(`Name ${name} is already taken`)
    }
}

export const existPhone= async(phone, company)=>{
    const alreadyPhone = await Company.findOne({phone}) 
        if(alreadyPhone && alreadyPhone._id != company.uid){
        console.error(`Name ${phone} is already taken`)
        throw new Error(`Name ${phone} is already taken`)
    }
}






//Validar que sea un id
/* export const objectIdValid = (objectId)=>{
    if(!isValidObjectId(objectId)) {
        throw new Error(`Category is not a valid ObjectId`)
    }
} */

export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}