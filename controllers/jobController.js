// // import jobModels  from "../models/jobModels.js";
// // export const createjobController = async (req,res,next)=>{
// //     const {company,position} =req.body
// //     if(!company || !position)
// //         {
// //             next("please provide all fields")
// //         }
// //     req.body.createdBy = req.user.userId;
// //     const job = await jobModels.create(req.body)
// //     res.status(201).json({job});
// // };
// // // get job 
// // export const getjobController = async (req, res, next) => {
// //     try {
// //         const jobs = await jobModels.find({ createdBy: req.user.userId });
// //         res.status(200).json({
// //             totalJobs: jobs.length,
// //             jobs,
// //         });
// //     } catch (error) {
// //         next(error); // Pass the error to the next middleware
// //     }
// // };


// // //update jobs 

// // export const updateJobController = async (req,res,next)=>{
// //     const {id} = req.params;
// //     if(!comapny || !position)
// //         {
// //             next("Please provide all fields");
// //         }
// //         //find job
// //     const job= await jobModels.findOne({_id:id})
// //     //validation
// //     if(!job)
// //         {
// //             next(`no jobs found wuth this id ${id}`)
// //         }
// //     if(req.user.userId === job.createdBy.toString())
// //         {
// //         return
// //         next("your not Authorized to update this job") 
// //         }
// //     const updateJob =await jobModels.findOneAndDelete({_id:id},req.body,{
// //          new :true,
// //          runValidators:true,
// //     });
// //     // res
// //     res.status(200).json({updateJob});
// // };

// // export const deletejobController =async(req,res,next)=>{

// // }


// import jobModels from "../models/jobModels.js";
// import mongoose from "mongoose"
// export const createjobController = async (req, res, next) => {
//     const { company, position } = req.body;
//     if (!company || !position) {
//         return next("Please provide all fields");
//     }
//     try {
//         req.body.createdBy = req.user.userId;
//         const job = await jobModels.create(req.body);
//         res.status(201).json({ job });
//     } catch (error) {
//         next(error);
//     }
// };

// // Get jobs
// export const getjobController = async (req, res, next) => {
//     // try {
//     //     const jobs = await jobModels.find({ createdBy: req.user.userId });
//     //     res.status(200).json({
//     //         totalJobs: jobs.length,
//     //         jobs,
//     //     });
//     // } catch (error) {
//     //     next(error);
//     // }
//     const { status, workType, search, sort } = req.query;
//   //conditons for searching filters
//   const queryObject = {
//     createdBy: req.user.userId,
//   };
//   //logic filters
//   if (status && status !== "all") {
//     queryObject.status = status;
//   }
//   if (workType && workType !== "all") {
//     queryObject.workType = workType;
//   }
//   if (search) {
//     queryObject.position = { $regex: search, $options: "i" };
//   }

//   let queryResult = jobModels.find(queryObject);

//   //sorting
//   if (sort === "latest") {
//     queryResult = queryResult.sort("-createdAt");
//   }
//   if (sort === "oldest") {
//     queryResult = queryResult.sort("createdAt");
//   }
//   if (sort === "a-z") {
//     queryResult = queryResult.sort("position");
//   }
//   if (sort === "z-a") {
//     queryResult = queryResult.sort("-position");
//   }
//   //pagination
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   queryResult = queryResult.skip(skip).limit(limit);
//   //jobs count
//   const totalJobs = await jobModels.countDocuments(queryResult);
//   const numOfPage = Math.ceil(totalJobs / limit);

//   const jobs = await queryResult; 

//   // const jobs = await jobsModel.find({ createdBy: req.user.userId });
//   res.status(200).json({
//     totalJobs,
//     jobs,
//     numOfPage,
//   });
// };

// // Update job
// export const updateJobController = async (req, res, next) => {
//     const { id } = req.params;
//     const { company, position } = req.body;
//     if (!company || !position) {
//         return next("Please provide all fields");
//     }
//     try {
//         const job = await jobModels.findOne({ _id: id });
//         if (!job) {
//             return next(`No job found with this ID ${id}`);
//         }
//         // if (req.user.userId !== job.createdBy.toString()) {
//         //     return next("You are not authorized to update this job");
//         // }
//         const updatedJob = await jobModels.findOneAndUpdate({ _id: id }, req.body, {
//             new: true,
//             runValidators: true,
//         });
//         res.status(200).json({ updatedJob });
//     } catch (error) {
//         next(error);
//     }
// };

// // Delete job
// // export const deletejobController = async (req, res, next) => {
// //     const { id } = req.params;
// //     try {
// //         const job = await jobModels.findOne({ _id: id });
// //         if (!job) {
// //             return next(`No job found with this ID ${id}`);
// //         }
// //         if (req.user.userId !== job.createdBy.toString()) {
// //             return next("You are not authorized to delete this job");
// //         }
// //         await jobModels.deleteOne({ _id: id });
// //         res.status(200).json({ message: "Job deleted successfully" });
// //     } catch (error) {
// //         next(error);
// //     }
// // };

// //delete jobs
// // export const deletejobController = async (req, res, next) => {
// //     const { id } = req.params;

// //     try {
// //         // Find the job by ID
// //         const job = await jobModels.findOne({ _id: id });
// //         if (!job) {
// //             // Return a 404 response if the job is not found
// //             return res.status(404).json({ message: `No job found with this ID ${id}` });
// //         }

// //         // Check if the user is authorized to delete the job
// //         if (req.user.userId !== job.createdBy.toString()) {
// //             // Return a 403 response if the user is not authorized
// //             return res.status(403).json({ message: "You are not authorized to delete this job" });
// //         }

// //         // Delete the job
// //         await jobModels.deleteOne();

// //         // Return a success response
// //         res.status(200).json({ message: "Job deleted successfully" });
// //     } catch (error) {
// //         // Pass the error to the next middleware
// //         next(error);
// //     }
// // };
// // ======= DELETE JOBS ===========
// export const deletejobController = async (req, res, next) => {
//     const { id } = req.params;
//     //find job
//     const job = await jobsModel.findOne({ _id: id });
//     //validation
//     if (!job) {
//       next(`No Job Found With This ID ${id}`);
//     }
//     if (!req.user.userId === job.createdBy.toString()) {
//       next("Your Not Authorize to delete this job");
//       return;
//     }
//     await job.deleteOne();
//     res.status(200).json({ message: "Success, Job Deleted!" });
//   };
  
// // =======  JOBS STATS & FILTERS ===========
// export const jobStatsController = async (req, res) => {
//     const stats = await jobModels.aggregate([
//       // search by user jobs
//       {
//         $match: {
//           createdBy: new mongoose.Types.ObjectId(req.user.userId),
//         },
//       },
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//         },
//       },
//     ]);
  
//     //default stats
//     const defaultStats = {
//       pending: stats.pending || 0,
//       reject: stats.reject || 0,
//       interview: stats.interview || 0,
//     };
  
//     //monthly yearly stats
//     let monthlyApplication = await jobModels.aggregate([
//       {
//         $match: {
//           createdBy: new mongoose.Types.ObjectId(req.user.userId),
//         },
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: "$createdAt" },
//             month: { $month: "$createdAt" },
//           },
//           count: {
//             $sum: 1,
//           },
//         },
//       },
//     ]);
//     monthlyApplication = monthlyApplication
//       .map((item) => {
//         const {
//           _id: { year, month },
//           count,
//         } = item;
//         const date = moment()
//           .month(month - 1)
//           .year(year)
//           .format("MMM Y");
//         return { date, count };
//       })
//       .reverse();
//     res
//       .status(200)
//       .json({ totlaJob: stats.length, defaultStats, monthlyApplication });
//   };

import mongoose from "mongoose";
import jobModels from "../models/jobModels.js";

// Create job
export const createjobController = async (req, res, next) => {
    const { company, position } = req.body;
    if (!company || !position) {
        return next("Please provide all fields");
    }
    try {
        req.body.createdBy = req.user.userId;
        const job = await jobModels.create(req.body);
        res.status(201).json({ job });
    } catch (error) {
        next(error);
    }
};

// Get jobs
export const getjobController = async (req, res, next) => {
    const { status, workType, search, sort } = req.query;
    const queryObject = {
        createdBy: req.user.userId,
    };

    if (status && status !== "all") {
        queryObject.status = status;
    }
    if (workType && workType !== "all") {
        queryObject.workType = workType;
    }
    if (search) {
        queryObject.position = { $regex: search, $options: "i" };
    }

    let queryResult = jobModels.find(queryObject);

    if (sort === "latest") {
        queryResult = queryResult.sort("-createdAt");
    } else if (sort === "oldest") {
        queryResult = queryResult.sort("createdAt");
    } else if (sort === "a-z") {
        queryResult = queryResult.sort("position");
    } else if (sort === "z-a") {
        queryResult = queryResult.sort("-position");
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    queryResult = queryResult.skip(skip).limit(limit);

    try {
        const totalJobs = await jobModels.countDocuments(queryObject);
        const numOfPages = Math.ceil(totalJobs / limit);
        const jobs = await queryResult;

        res.status(200).json({
            totalJobs,
            jobs,
            numOfPages,
        });
    } catch (error) {
        next(error);
    }
};

// Update job
export const updateJobController = async (req, res, next) => {
    const { id } = req.params;
    const { company, position } = req.body;
    if (!company || !position) {
        return next("Please provide all fields");
    }
    try {
        const job = await jobModels.findOne({ _id: id });
        if (!job) {
            return next(`No job found with this ID ${id}`);
        }
        if (req.user.userId !== job.createdBy.toString()) {
            return next("You are not authorized to update this job");
        }
        const updatedJob = await jobModels.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ updatedJob });
    } catch (error) {
        next(error);
    }
};

// Delete job
export const deletejobController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await jobModels.findOne({ _id: id });
        if (!job) {
            return next(`No job found with this ID ${id}`);
        }
        if (req.user.userId !== job.createdBy.toString()) {
            return next("You are not authorized to delete this job");
        }
        await jobModels.deleteOne({ _id: id });
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// Job stats
export const jobStatsController = async (req, res, next) => {
    try {
        const stats = await jobModels.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId),
                },
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        const defaultStats = {
            pending: stats.find(stat => stat._id === "pending")?.count || 0,
            reject: stats.find(stat => stat._id === "reject")?.count || 0,
            interview: stats.find(stat => stat._id === "interview")?.count || 0,
        };

        let monthlyApplication = await jobModels.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId),
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    count: { $sum: 1 },
                },
            },
        ]);

        monthlyApplication = monthlyApplication.map(item => {
            const {
                _id: { year, month },
                count,
            } = item;
            const date = new Date(year, month - 1).toLocaleString('default', { month: 'short', year: 'numeric' });
            return { date, count };
        }).reverse();

        res.status(200).json({ totalJobs: stats.length, defaultStats, monthlyApplication });
    } catch (error) {
        next(error);
    }
};
