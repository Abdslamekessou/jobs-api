const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError , UnauthenticatedError} = require('../errors');
const bcrypt = require('bcrypt')


const register = async (req , res) =>{
    const user = await User.create({...req.body}) 
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user : {name : user.name} , token});
}


const login = async (req ,res) =>{
    const {email , password} = req.body

    if(!email || !password){
        throw new BadRequestError("Please Provide Email And Password")
    }

    const user = await User.findOne({email})
    //compare password
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    
    const isCorrectPassword = await user.comparePassword(password)
    if(!isCorrectPassword){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user :{name : user.name} , token} )
}

module.exports = {
    register ,
    login
}