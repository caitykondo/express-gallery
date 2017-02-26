const db = require('./../models');
const { User } = db;

function checkIfExists(req, res, next) {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then((username) => {
    if(username){
      req.exists = true;
    }else{
      req.exists =  false;
    }
  });
  next();
}

module.exports = checkIfExists;