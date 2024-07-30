
import userModel from "../models/userModel.js";

const updateUserControllers = async(req,res,next) => {
const {name, lastname,email, password,location}= req.body;
if(!name || !email ||!lastname ||  !password|| !location)
    {
        next("please provide All fields")
        
    }
    const user = await userModel.findOne({_id: req.user.userId})
    user.name = name;
    user.lastname= lastname;
    user.email=email;
    user.password= password;
    user.location=location;
    await user.save();
    const token = user.createjwt();
    res.status(200).json({
        user,
        token
    });

}

export default updateUserControllers
