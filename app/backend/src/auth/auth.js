// auth.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../database/database");

const generateToken = (user, secret, expiresIn) => {
  return jwt.sign(user, secret, expiresIn);
};

const authenticateSuperuser = async (superuser, password) => {
  try {
    const userdb = await db.one("SELECT sellername, sellerpass FROM seller WHERE isadmin = TRUE;");
    
    if (superuser === userdb.sellername) {
      const isValid = await bcrypt.compare(password, userdb.sellerpass);
      return isValid;
    }
    
    return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const authenticateUser = async (selluser, password) => {
  try {
    const userdb = await db.one("SELECT sellername, sellerpass FROM seller WHERE sellername=$1;", [selluser]);
    
    if (selluser === userdb.sellername) {
      const isValid = await bcrypt.compare(password, userdb.sellerpass);
      return isValid;
    }
    
    return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  generateToken,
  authenticateSuperuser,
  authenticateUser,
};
