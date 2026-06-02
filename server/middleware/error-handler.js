//(err,req,res,next) this is expresses middleware for errs so it directs all errors here

const errorHandlerMiddleware = (err,req,res,next) => {
  const statusCode = err.statusCode || 500
  return res.status(statusCode).json({ msg: err.message || 'Something went wrong .please try again' });
  
}

module.exports = errorHandlerMiddleware