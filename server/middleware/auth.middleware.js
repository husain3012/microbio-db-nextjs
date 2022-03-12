const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");

const requireAuth = (req, res, next) => {
  // get token from request header
  const token = req.headers.Authorization && req.headers.Authorization.split(" ")[1];
  console.log(token);

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        req.decodedToken = decodedToken;
        User.findOne({ _id: decodedToken._id }).then((user) => {
          delete user.password;
          req.user = user;

          next();
        });
      }
    });
  } else {
    res.redirect("/login");

    console.log("user not verified");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
