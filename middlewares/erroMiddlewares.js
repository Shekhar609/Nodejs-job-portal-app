//error middleware || NEXTfunction

const erroMiddlewares = (err,req,res,next) => {
 console.log(err);
const defautErrors={
   statusCode:500,
   message: err
}
 //missing field error
 if(err.name === "validationError")
   {
      defautErrors.statusCode=400
      defautErrors.message= Object.values(err.errors).map(item=>item.message).join(",");
   }
   //unique email required
   if(err.code && err.statusCode === 11000)
      {
         defautErrors.statusCode=400; 
         defautErrors.message= `${Object.keys(err.keyValue)} field has to be unique`;
      }
   res.status(defautErrors.statusCode).json({
      messsage: defautErrors.message
   })
} 

export default erroMiddlewares;
