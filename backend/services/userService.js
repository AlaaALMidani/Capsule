const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserRepo } = require("../models/userModel");
const {ColorPaletteService} = require('./paletteService');  
    
class UserServices {

  async hashPassword(password) {
    const saltRounds = 9; // Number of salt rounds (higher is more secure, but slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
  async comparePassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
  secretKey = "sdwe";
  generateToken(user) {
    const payload = {
      userID: user._id,
      username: user.username,
    };

    const options = {
      expiresIn: "24h",
    };

    try {
      const token = jwt.sign(payload, this.secretKey, options);
      return token;
    } catch (error) {
      console.error("Error generating token:", error);
      return null;
    }
  }
  async validate(user) {
    const errors = {};

    // fullName
    if (
      !user.fullName ||
      typeof user.fullName !== "string" ||
      user.fullName.trim().length < 2 ||
      user.fullName.trim().length > 50
    ) {
      errors.fullName =
        "First name is required, must be a string, and between 2 and 50 characters.";
    }

    //username
    if (!user.username) {
      errors.username = "Username is required.";
    } else if (user.username.length < 5 || user.username.length > 20) {
      errors.username = "Username must be between 5 and 20 characters long.";
    } else if (!/^[a-zA-Z0-9._]+$/.test(user.username)) {
      errors.username =
        "Username can only contain alphanumeric characters, periods (.), and underscores (_).";
    } else if (await UserRepo.findByUsername(user.username)) {
      console.log(UserRepo.findByUsername(user.username))
      errors.username = "Username is already exist";
    }

    //email
    if (!user.email) {
      errors.email = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)
    ) {
      errors.email = "Invalid email format.";
    } else if (await UserRepo.findByEmail(user.email)) {
      errors.email = "Email is already exist";
    }

    //password
    if (!user.password) {
      errors.password = "Password is required.";
    } else if (user.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    return errors;
  }
  async register(user) {
    const validation = await this.validate(user);

    if (Object.keys(validation).length > 0) {
      return { ok: false, validation: validation };
    }

    const hashedPassword = await this.hashPassword(user.password);
    
    const newUser = await UserRepo.create({
      ...user,
      password: hashedPassword,
    });

    const token = this.generateToken(newUser);
    await ColorPaletteService.addInitialState(newUser._id) ;
    return { ok: true, user: { ...newUser._doc, token } };
  }
  async login({ emailOrUsername, password }) {

    let user = await UserRepo.findByEmail(emailOrUsername);

    if (user && await this.comparePassword(password, user.password)) {
      return { ok: true, user: { ...user._doc, token: this.generateToken(user) } };
    }

    user = await UserRepo.findByUsername(emailOrUsername)

    if (user && await this.comparePassword(password, user.password)) {
      return { ok: true, user: { ...user._doc, token: this.generateToken(user) } };
    }
   
    return { ok: false, message: "email or password isn't correct" };
  }
}
module.exports = new UserServices();
