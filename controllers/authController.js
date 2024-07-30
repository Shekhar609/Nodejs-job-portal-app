import express from 'express'
import userModel from '../models/userModel.js';

const authController = async(req, res,next) => {

    const {name,email, password} =req.body;
    //validate
    if(!name){
        next("name is required");
    }
    if(!email){
        next("email is required");
    }
    if(!password){
        next("password is required");
    }
    const existinguser =await userModel.findOne({email});
    if(existinguser)
        {           
            next("Email already registered please Login");
        }
        const user = await userModel.create({name, email, password})
        const token = user.createjwt();
        res.status(201).send({
            success:true,
            message:"User created successfully ",
            user:{
                name:user.name,
                lastname:user.lastname,
                email:user.email,
                location:user.location
            },
            token
        })
 
}

export default authController
 
export const loginController = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password)
        {
         next("Please provide all fields")
        }
    const user = await userModel.findOne({email}).select('+Password');
    if(!user)
        {
            next("Invalid Credential");
        }
    //user.password= undefined
        // compare password
    const isMatch = await user.comparePassword(password)
    if(!isMatch)
        {
            next("Invalid username and password");
        }
        const token = user.createjwt();
        res.status(200).json({
            success:true,
            message:"Login successfully",
            user,
            token
        })
    
}
