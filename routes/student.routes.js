const {
  registerStudent,
  getAllStudent,
  getStudentDetailsById,
  removeStudentById,
  deleteStudent,
  updateStudentDetailsById
} = require("../controller/student.controller");
const router = require("express").Router();

router.post("/", registerStudent);
router.get("/", getAllStudent);
router.get("/detailsof/:id",getStudentDetailsById)
router.delete("/remove/:studentid",removeStudentById)
router.delete("/delete-student",deleteStudent)
router.patch("/update-details/:id",updateStudentDetailsById)

module.exports = router;
