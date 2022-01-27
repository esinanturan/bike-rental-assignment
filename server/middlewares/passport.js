const passport = require("passport");
const Strategy = require("passport-http-bearer").Strategy;
const db = require("../models");

passport.use(
  new Strategy(function (token, cb) {
    db.User.findOne({
      where: { token: token },
      attributes: { exclude: ["password"] },
    }).then((user) => {
      if (user instanceof db.User) {
        cb(null, user.toJSON());
      } else {
        cb(null, false);
      }
    });
  })
);

module.exports = passport;
