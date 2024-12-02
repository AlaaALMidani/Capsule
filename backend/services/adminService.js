const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserRepo } = require("../models/userModel");
const { OrderRepo } = require("../models/orderModel");

class AdminServices {
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

  isValidSyrianMobile(number) {
    //This function is the same as the previous response
    const cleanedNumber = number.replace(/\D/g, "");
    const mtnPrefixes = ["099", "094", "095", "093"];
    const syriatelPrefixes = ["098", "092", "091", "096"];

    if (
      (mtnPrefixes.some((prefix) => cleanedNumber.startsWith(prefix)) &&
        cleanedNumber.length === 10) ||
      (syriatelPrefixes.some((prefix) => cleanedNumber.startsWith(prefix)) &&
        cleanedNumber.length === 10)
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
      errors.phoneNumber = "Phone number is required.";
    } else if (await UserRepo.findByPhoneNumber(user.phoneNumber)) {
      errors.phoneNumber = "Phone number is already exist";
    } else {
      const phoneNumber = user.phoneNumber.replace(/\D/g, ""); // Remove non-digits

      if (this.isValidSyrianMobile(phoneNumber)) {
        // Syrian number is valid
      } else if (this.isValidInternationalMobile(phoneNumber)) {
        // International number is valid (general check)
      } else {
        errors.phoneNumber =
          "Invalid phone number format.  Please enter a valid Syrian or international number.";
      }
    }
    if (user.active === undefined) {
      errors.active = "active status is required.";
    }
    if (!user.location) {
      errors.location = "location is required.";
    }

    //password
    if (!user.password) {
      errors.password = "Password is required.";
    } else if (user.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    return errors;
  }

  //users
  async addUser(user) {
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

    return { ok: true, user: { ...newUser._doc, token } };
  }

  async getAllUsers() {
    try {
      const users = await UserRepo.findAll();
      return { ok: true, users: users };
    } catch (error) {
      return { ok: false, error: "Something went wrong" };
    }
    
  }
  async getUsers(roleID) {
    try {
      const users = await UserRepo.findByRole(roleID);
      return { ok: true, users: users };
    } catch (error) {
      return { ok: false, error: "Invalid role" };
    }
  }
  //orders
  async getAllOrders() {
    try {
      const orders = await OrderRepo.findAll();
      return { ok: true, orders: orders };
    } catch (error) {
      return { ok: false, error: "Something went wrong" };
    }
  }
  async getOrders(status) {
    console.log(status);
    try {
      const orders = await OrderRepo.findByStatus(status);
      return { ok: true, orders: orders };
    } catch (error) {
      return { ok: false, error: "Invalid status" };
    }
  }

  //profiles
  async getProfile(userID) {
    try {
      const user = await UserRepo.findByID(userID);
      return { ok: true, user: { ...user._doc, password: undefined } };
    } catch (error) {
      return { ok: false, error: "User not found" };
    }
  }

  async getUserOrders(userID, status) {
    try {
      const orders = await OrderRepo.findByIDAndStatus(userID, status);
      return { ok: true, orders: orders };
    } catch (error) {
      return { ok: false, error: "something went wrong" };
    }
  }

  async toggleActivation(userID) {
    try {
      const user = await UserRepo.findByID(userID);
      const updatedUser = await UserRepo.update(userID, {
        active: !user.active,
      });
      return { ok: true, user: updatedUser };
    } catch (error) {
      return { ok: false, error: "User not found" };
    }
  }
}
module.exports = new AdminServices();
