const jwt = require("jsonwebtoken");

async function isAdmin(req, res, next) {
  const token = req.cookies.securetoken;
  console.log("token",token)
  try {
    //verify
    console.log("secret",process.env.JWT_SECRET_KEY)
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decode",decode)
    if (!decode) {
      throw new Error("invalid token");
    }

    if (decode.role !== "admin") {
      return res.status(401).json({ message: `access denied! use role is ${decode.role} and only admins are allowed` });
    }
    req.userId = decode.id;
    req.adminName = decode.name;
    next();
  } catch (error) {
    console.log("catch block ran")
    res.status(500).json({ message: error.message });
  }
}

module.exports = { isAdmin };
