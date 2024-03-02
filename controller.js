
const options = {
  lemon:  'yellow',
  lime: 'limegreen',
  tangerine: 'orange',
  grapefruit: 'lightcoral'
};

const controller = {
  // add a method called 'getColor'
  getColor: (req,res,next) => {
    const fruit = req.body.fruit
    if (fruit === 'lavender') {

      // If we just want to make a lavender option
        // res.locals = 'lavender'
        // return next()

      // If you want to create a lavender error
      return next({
        log: 'Color lavender does not exist',
        status: 404,
        message: { err: 'Color does not exist' },
      });
      
    }
    
    res.locals = options[fruit];
    return next();
  }
}

// Export the controller object
module.exports = {controller};