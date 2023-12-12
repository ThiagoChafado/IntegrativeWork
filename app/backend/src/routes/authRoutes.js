const express = require("express");
const { generateToken, authenticateSuperuser, authenticateUser } = require("../auth/auth");

const router = express.Router();


//Checking credentials
router.post("/loginsuper", async (req, res) => {
  try {
    const superuser = req.body.username;
    const password = req.body.password;

    const isValid = await authenticateSuperuser(superuser, password);

    if (isValid) {
      console.log("Logged");
      const token = generateToken({ superuser }, process.env.JWT_SECRET, { expiresIn: 3600 });
      res.json({ auth: true, token: token });
    } else {
      console.log("Invalid credentials");
      res.status(401).json({ auth: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ auth: false, message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const selluser = req.body.username;
    const password = req.body.password;

    const isValid = await authenticateUser(selluser, password);

    if (isValid) {
      console.log("Logged");
      const token = generateToken({ selluser }, process.env.JWT_SECRET, { expiresIn: 3600 });
      res.json({ auth: true, token: token, seller: selluser });
    } else {
      console.log("Invalid credentials");
      res.status(401).json({ auth: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ auth: false, message: "Internal server error" });
  }
});

module.exports = router;
