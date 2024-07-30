import express from "express";
import { createjobController, deletejobController, getjobController, jobStatsController, updateJobController } from "../controllers/jobController.js";
import userAuth from "../middlewares/authMiddlewares.js"

const router = express.Router();

//routes
//create JOB|| POST 

router.post("/create-job",userAuth,createjobController);

//get job
router.get("/get-job",userAuth,getjobController);
// update jobs || put|| patch
router.patch('/update-job/:id',userAuth,updateJobController)
// delete jobs || delete
router.patch('/delete-job/:id',userAuth,deletejobController)
//job stats ||get
router.get("/job-stats",userAuth,jobStatsController)
export default router;
