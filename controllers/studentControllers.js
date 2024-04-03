import { StudentData } from "../model/studentDatamodel.js";

export const getallStudents = async (req, res) => {
  try {
    const students = await StudentData.find();
    res.status(200).json({
      status: "success",
      data: {
        students,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
    });
  }
};

export const createStudentdata = async (req, res) => {
  try {
    const newStudent = await StudentData.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        students: newStudent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
    });
    console.log(err); // Log the error object for debugging
  }
};

export const getStudent = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const currentStudent = await StudentData.find({ id: id });
    // const currentStudent = await StudentData.findById(req.params.id * 1);
    res.status(201).json({
      status: "success",
      data: {
        currentStudent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
    });
    console.log(err); // Log the error object for debugging
  }
};

export const updateStudent = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const studentupdated = await StudentData.findOneAndUpdate(
      { id: id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        studentupdated,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
    });
    console.log(err); // Log the error object for debugging
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const studentupdated = await StudentData.findOneAndDelete({ id: id });
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
    });
    console.log(err); // Log the error object for debugging
  }
};

export const getTopstudents = async (req, res) => {
  try {
    const student = await StudentData.aggregate([
      {
        $match: { average: { $gte: 90 } },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
    });
    console.log(err); // Log the error object for debugging
  }
};

export const getweekstudents = async (req, res) => {
  try {
    const students = await StudentData.aggregate([
      {
        $match: { average: { $lte: 40 } },
      },
    ]);

    if (students.length > 0) {
      res.status(200).json({
        status: "success",
        data: students,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No students with an average score less than or equal to 40%",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
    });
    console.log(err); // Log the error object for debugging
  }
};

export const gettopper = async (req, res) => {
  try {
    const students = await StudentData.aggregate([
      {
        // $match: { average: { $gte: 96 } },
        $sort: { average: -1 },
        
      },
      {
        $limit: 1 // Limit to only one document, which will be the highest scorer
      }
    ]);

    if (students.length > 0) {
      res.status(200).json({
        status: "success",
        data: students[0],
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No students with an average score less than or equal to 90%",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
    });
    console.log(err); // Log the error object for debugging
  }
};
