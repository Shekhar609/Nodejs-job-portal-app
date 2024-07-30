
import mongoose  from "mongoose";
import colors from 'colors';

 const connectdb = async ()=>{
     try {
       const conn= mongoose.connect(process.env.MONGO_URL);
       console.log(`connected to mongodb database ${mongoose.connection.host}`.bgMagenta.white) 
     } catch (error) {
        console.log(`databse is not connected ${error}`);
     }
     
 }
 export  default connectdb;