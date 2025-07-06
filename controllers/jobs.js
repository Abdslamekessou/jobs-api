const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError , NotFoundError} = require('../errors')

const getAllJobs = async (req , res) =>{
    const jobs = await Job.find({createdBy : req.user.userId}).sort('createdAt');

    res.status(StatusCodes.OK).json({count : jobs.length ,
        jobs
    })
}

const getJob = async (req , res) =>{
    const {user:{userId} , params : {id : jobId}} = req;

    const job = await Job.findOne({
        _id  : jobId ,
        createdBy : userId
    }
    ) 

    if(!job){
        throw new NotFoundError(`No job Found With Id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job});
}

const createJob = async (req , res) =>{
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job});
}

const updateJob = async (req , res) =>{
    const {
        user : {userId} ,
        params : {id : jobId} ,
        body : {company , position }
    } = req

    if(!company || !position ){
        throw new BadRequestError("Company, Position are required")
    }

    const job = await Job.findByIdAndUpdate(
        {_id : jobId , createBy : userId} ,
        req.body ,
        {new:true , runValidators:true}
    )

    if(!job){
        throw new NotFoundError(`No Job Found With this Id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job});
}

const deleteJob = async (req , res) =>{
    const { user : {userId} , params:{id : jobId} } = req

    const job = await Job.findOneAndDelete({
        _id : jobId ,
        createdBy : userId
    })

if (!job) {
    throw new NotFoundError(`No job found with ID: ${jobId}`);
}

res.status(StatusCodes.OK).json({msg: "Job Deleted Succesfully"});

}

module.exports = {
    getAllJobs ,
    getJob ,
    createJob ,
    updateJob ,
    deleteJob
}