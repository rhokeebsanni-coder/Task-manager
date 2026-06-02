const asyncWrapper = (fn) => {
  return async(req,res,next) => {
    try{
      await fn(req,res,next)
    } catch (error) {
      next(error); //normally next() means I’m done here — pass control to the next middleware/function]
      // but this special one means skip all other middleware and jump to error middleware
    }
  }
}

module.exports = asyncWrapper