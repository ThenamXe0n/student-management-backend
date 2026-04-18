require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectdb");
const StudentRouter = require("./routes/student.routes");
const EmployeeRouter = require("./routes/employee.routes");
const AdminRouter = require("./routes/admin.routes");
const { isAdmin } = require("./middlewares/authMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173","https://student-management-frontend-liard.vercel.app"],
    credentials: true,
  }),
);

//endPoint route handelers
app.get("/", (req, res) => {
  res.status(200).json({ message: "server live" });
});
app.get("/admin-only", isAdmin, (req, res) => {
  console.log("admin id is ", req.userId, "and admin name is ", req.adminName);
  res.json({ message: "admin access granted" });
});
app.use("/student", isAdmin, StudentRouter);
app.use("/employee", EmployeeRouter);
app.use("/admin", AdminRouter);

const port = process.env.PORT || 8000;
//server listen
app.listen(port, async () => {
  try {
    await connectDb();
    console.log(`server is running on port ${port}`);
  } catch (error) {
    process.exit(1);
  }
});
