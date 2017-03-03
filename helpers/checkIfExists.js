const db = require('./../models');
const { User } = db;

function checkIfExists(req, res, next) {
  console.log('checkIfExisting');
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then((username) => {
    if(username){
      console.log('user found');
      req.exists = true;
    }else{
      console.log('user not found');
      req.exists =  false;
    }
  });
  next();
}

module.exports = checkIfExists;