const express = require("express");
const passport = require("passport");
const LocalStratergy = require("passport-local").Strategy;
const User = require("./models/user");

passport.use(
  new LocalStratergy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });

      if (!user) return done(null, false, { message: `Invalid email` });

      const isPasswordMatch = await user.comparePassword(password);

      if (isPasswordMatch) return done(null, user);
      else return done(null, false, { message: `Incorrect password` });
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
