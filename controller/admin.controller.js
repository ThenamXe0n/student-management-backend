const AdminModel = require("../model/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerAdmin(req, res) {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await AdminModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "admin registered successfully", data: admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function loginAdmin(req, res) {
  const { email, password } = req.body;
  try {
    // find user by email id
    const admin = await AdminModel.findOne({ email });
    // not found
    if (!admin) {
      res
        .status(404)
        .json({ message: "admin not found or registed", data: null });
      return;
    }
    //check for password
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "invalid credentials", data: null });
    }

    const dataToSend = {
      name: admin.name,
      email: admin.email,
      role: admin.role,
      id: admin._id,
    };

    //generate token
    const token = await jwt.sign(dataToSend, process.env.JWT_SECRET_KEY, {
      expiresIn: "7h",
    });

    res.cookie("securetoken", token, {
      httpOnly: true,
      sameSite: "None", // None,Lax,Strict
      secure: true, // https secure connections ,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ message: "admin login successfully", data: dataToSend, token });
    // not matched
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function sendRestLink(req,res) {
  const { email } = req.query;
  try {
    // find the user by given email (from req.query)
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "admin does not exist" });
    }
    //create a token and store it in database document of found admin
    const resetToken = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.RESET_JWT_KEY,
    );
    admin.restToken = resetToken;
    await admin.save();

    // send this token to client or user so he can reset password by verifying it using this token

    console.log(
      `message received password reset link is  `,
      `http://localhost:5173/rest-password/${resetToken}`,
    );
    res.status(200).json({ message: "reset link sent on email successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { registerAdmin, loginAdmin,sendRestLink };
