import express from 'express'
import authMiddlewares from '../middlewares/authMiddlewares.js';

import updateUserControllers from '../controllers/updateUserControllers.js';
// routes 
const router = express.Router();
//update|| user
router.put("/update-user",authMiddlewares,updateUserControllers)

export default router;