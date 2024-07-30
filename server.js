// swagger-api
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from 'swagger-jsdoc'
//import packages
import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
//Security packages
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
// import files
import connectdb from './config/db.js';
//routes
import testRoutes from './Routes/testRoutes.js'
import authRoutes from './Routes/authRoutes.js'
import erroMiddlewares from './middlewares/erroMiddlewares.js';
import userRoutes from './Routes/userRoutes.js'
import jobRoutes from "./Routes/jobRoutes.js"
//dot env config
dotenv.config();
// connect to databse
connectdb();
// Swagger api config
// swagger api options
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Job Portal Application",
        description: "Node Expressjs Job Portal Application",
      },
      servers: [
        {
               url: "http://localhost:8080",
            //  url: "https://nodejs-job-portal-app.onrender.com"
        },
      ],
    },
    apis: ["./Routes/*.js"],
  };
  
  const spec = swaggerDoc(options);
// port
const port = process.env.PORT
// rest object
const app = express();
//middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
//


// routes 
app.use('/api/vi/test',testRoutes);

 
app.use('/api/vi/auth', authRoutes);

app.use("/api/vi/user",userRoutes)

app.use("/api/vi/job",jobRoutes)
//homeroute root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

app.use(erroMiddlewares);



app.listen(port,()=>{
    console.log(`server is running ${process.env.DEV_MODE} mode on port no ${port}`);
}) 