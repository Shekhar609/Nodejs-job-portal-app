import express from 'express'
import testPostController from '../controllers/testController.js';
import authMiddlewares from '../middlewares/authMiddlewares.js';

// router object
const router =express();

//routes
router.post('/test-post',authMiddlewares , testPostController);

export default router;