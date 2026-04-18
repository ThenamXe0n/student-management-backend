const StudentModel = require("../model/student.model");

async function registerStudent(req, res) {
  try {
    const createdStudent = await StudentModel.create(req.body);
    res
      .status(201)
      .json({ message: "student registered", data: createdStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllStudent(req, res) {
  console.log("query", req.query);
  try {
    const studentList = await StudentModel.find();
    res
      .status(200)
      .json({ message: "fetched student list", data: studentList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getStudentDetailsById(req, res) {
  // console.log("params", req.params);
  const { id } = req.params;
  try {
    const studentDetails = await StudentModel.findById(id);
    if (!studentDetails) {
      res.status(404).json({ message: "student does not exist", data: null });
      return;
    }
    res.status(200).json({ message: "working", data: studentDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function removeStudentById(req, res) {
  const { studentid } = req.params;
  try {
    const deletedStudent = await StudentModel.findByIdAndDelete(studentid);

    if (!deletedStudent) {
      res.status(404).json({ message: "student not found", data: null });
      return;
    }

    res.status(200).json({
      message: "student data deleted successfully",
      data: deletedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function deleteStudent(req, res) {
  try {
    const deletedStudent = await StudentModel.findOneAndDelete(req.query);

    if (!deletedStudent) {
      res.status(404).json({ message: "student not found", data: null });
      return;
    }

    res.status(200).json({
      message: "student data deleted successfully",
      data: deletedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateStudentDetailsById(req, res) {
  const { id } = req.params;
  try {
    const updatedStudent = await StudentModel.findByIdAndUpdate(req.query, req.body,{new:true});
    res
      .status(200)
      .json({
        message: "student details updated successfully",
        data: updatedStudent,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  registerStudent,
  getAllStudent,
  getStudentDetailsById,
  removeStudentById,
  deleteStudent,
  updateStudentDetailsById,
};
