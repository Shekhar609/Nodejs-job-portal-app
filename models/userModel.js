import mongoose from "mongoose"
import validator from "validator";
import bcrypt from  "bcryptjs";
import jwt from "jsonwebtoken";
 
//schema 
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        validate: validator.isEmail
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"password lenth should be greater than 6 character"]
    },
    location:{
        type:String,
        default:"India",

    }, 

},
{
    timestamps:true
});
userSchema.pre('save',async function(){
    if(!this.isModified) return ; 
    const salt = await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password, salt);
})
userSchema.methods.comparePassword = async function(userPassword){
   const isMatch = await bcrypt.compare(userPassword, this.password);
   return isMatch;
}

userSchema.methods.createjwt= function(){
    return jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:"1d"})
}
export default mongoose.model("User", userSchema);
