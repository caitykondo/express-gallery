function isAuthenticated(req, res, next) {
  console.log('authenticating...');
  if(req.isAuthenticated()){
    console.log(req);
    next();
  }else{
    res.redirect('/login');
  }
}
module.exports = isAuthenticated;