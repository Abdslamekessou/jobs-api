const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
      statusCode : err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR ,
      msg : err.message || 'Something went wrong. Please try again later.'
  }

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  if(err.name === 'CastError'){
    customError.msg = `Invalid ID format for field ${err.path} : ${err.value}`
    customError.statusCode = StatusCodes.BAD_REQUEST;
    
  }

  if(err.name === 'ValidationError'){
    customError.msg = Object.keys(err.errors).map((item) => err.errors[item].message).join(" , ");
    customError.statusCode = StatusCodes.BAD_REQUEST; 
  }
  
  if(err.code && err.code === 11000){
    customError.msg = `Duplicated value for ${Object.keys(err.keyValue)} , please provide a different value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  return res.status(customError.statusCode).json({ msg : customError.msg })
}

module.exports = errorHandlerMiddleware
