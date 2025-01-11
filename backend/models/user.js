const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.pre("save", async function (next) {
  const user = this;

  //check for password changed or not

  if (!user.isModified("password")) return next();

  try {
    const slat = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(this.password, slat);
    this.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
