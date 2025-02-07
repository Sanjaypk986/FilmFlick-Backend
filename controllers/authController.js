const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// login controller
const login = async (req, res) => {
  try {
    // find user by email
    const data = req.body;
    const user = await User.findOne({ email: data.email }).exec();
    if (!user) {
      return res.status(401).send("Invalid Email or Password");
    }
    // password check using bcrypt
    const passwordsMatch = bcrypt.compareSync(data.password, user.password);
    if (passwordsMatch) {
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: "1hr" }
      );
      // send token as cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.json({ message: "login success", userId: user._id }); // Update this line
    } else {
      res.status(401).send("Unauthorized Access! Wrong Password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal Server Error");
  }
};

// verify controller
const Verify = async (req, res) => {
  // cookie verification using jwt
  if (req.cookies && req.cookies.token) {
    try {
      const payload = jwt.verify(req.cookies.token, process.env.JWT_KEY);
      req.user = payload
      res.json({ verified: true,userId: req.user._id });

    } catch (error) {
      console.error("JWT verification error:", error);
      res.status(401).send("Unauthorized Access!");
    }
  } else {
    res.json({ verified: false});
  }
};

// logout controller
const Logout = async (req, res) => {
  try {
    // delete the cookie 
    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.send("Logged Out");
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { login, Verify, Logout };
