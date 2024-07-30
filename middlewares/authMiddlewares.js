// import JWT from "jsonwebtoken";


// const authMiddlewares = (req,res,next) => {
//   const authheader = req.headers.authorization
//   if(!authheader || !authheader.startswith('Bearer'))
//     {
//     next("auth failed");
//     }
//     const token = authheader.split(' ')[1];
//     try {
//       const payload = JWTverify(token, process.env.JWT_SECRET);
//       req.user ={userId:payload.userId}
//         next();
//     } catch (error) {
//       next("authetication failed");
//     }
// }

// export default authMiddlewares
import JWT from "jsonwebtoken";

const authMiddlewares = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Authorization failed" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
}

export default authMiddlewares;
