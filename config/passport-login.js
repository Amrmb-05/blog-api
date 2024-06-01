const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const asyncHandler = require("express-async-handler");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  new LocalStrategy(
    asyncHandler(async (username, password, done) => {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }
      return done(null, user);
    })
  )
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "mb",
};

passport.use(
  new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.sub)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => console.error(err));
  })
);

module.exports = passport;
