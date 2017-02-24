function isAuthenticated(req, res, next) {
  console.log('authenticating...');
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/login');
  }
}
module.exports = isAuthenticated;