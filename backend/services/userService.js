const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserRepo } = require("../models/userModel");

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
      phoneNumber: user.phoneNumber,
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
  isValidSyrianMobile(number) {
    //This function is the same as the previous response
    const cleanedNumber = number.replace(/\D/g, '');
    const mtnPrefixes = ['099', '094', '095', '093'];
    const syriatelPrefixes = ['098', '092', '091', '096'];

    if (
      (mtnPrefixes.some((prefix) => cleanedNumber.startsWith(prefix)) && cleanedNumber.length === 10) ||
      (syriatelPrefixes.some((prefix) => cleanedNumber.startsWith(prefix)) && cleanedNumber.length === 10)
    ) {
      return true;
    } else {
      return false;
    }
  }

  isValidInternationalMobile(number) {
    // This is a more general check - adjust as needed for your requirements.
    //  This example is basic and might need refinement depending on your needs.
    return /^\+[1-9]\d{1,14}$/.test(number); // Checks for + followed by 1-15 digits
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


    // Phone Number Validation (Syrian and International)
    if (!user.phoneNumber) {
      errors.phoneNumber = 'Phone number is required.';
    } else if (await UserRepo.findByPhoneNumber(user.phoneNumber)) {
      errors.phoneNumber = "Phone number is already exist";
    }
     else {
      const phoneNumber = user.phoneNumber.replace(/\D/g, ''); // Remove non-digits

      if (this.isValidSyrianMobile(phoneNumber)) {
        // Syrian number is valid
      } else if (this.isValidInternationalMobile(phoneNumber)) {
        // International number is valid (general check)
      } else {
        errors.phoneNumber = 'Invalid phone number format.  Please enter a valid Syrian or international number.';
      }
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

    const token = this.generateToken(newUser._doc);
    return { ok: true, user: { ...newUser._doc, token } };
  }
  async login({phoneNumber,password}) {

    let user = await UserRepo.findByPhoneNumber(phoneNumber);

    if (user && await this.comparePassword(password, user.password)) {
      return { ok: true, user: { ...user._doc, token: this.generateToken(user) } };
    }

    return { ok: false, message: "phone number or password isn't correct" };
  } 
 
}
module.exports = new UserServices();
