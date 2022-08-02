const isSuperAdmin = (req, res, next) => {
    if (req.user.role == "superAdmin") {
      next();
    } else {
      res.status(401).send({ msg: "you are not auth/aut" });
    }
  };
  
  module.exports=isSuperAdmin