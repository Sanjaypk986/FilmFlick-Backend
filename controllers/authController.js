const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    // get the data from req.body
    const data = req.body;
    // check user in database with given email.
    const user = await User.findOne({ email: data.email }).exec();
    //   if statement to check user availability
    if (!user) {
      return res.status(401).send("Invalid Email or Password");
    }
    // check password in database with given password
    const passwordsMatch = bcrypt.compareSync(data.password, user.password);
    if (passwordsMatch) {
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: "1hr" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.send("Logged In");
    } else {
      res.status(401).send("Unauthorized Access! Wrong Password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal Server Error");
  }
};

const Verify = async (req, res) => {
  if (req.cookies && req.cookies.token) {
    try {
      const payload = jwt.verify(req.cookies.token, process.env.JWT_KEY);
      res.json({ verified: true });
    } catch (error) {
      console.error("JWT verification error:", error);
      res.status(401).send("Unauthorized Access!");
    }
  } else {
    res.json({ verified: false });
  }
};
const Logout = async (req, res) => {
  try {
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
