import express from 'express';
import { getallStudents, createStudentdata,getStudent,updateStudent,deleteStudent, getTopstudents, getweekstudents, gettopper } from '../controllers/studentControllers.js';

const studentRouter = express.Router();

//routes
studentRouter.route('/topper').get(gettopper);
studentRouter.route('/weekies').get(getweekstudents);
studentRouter.route('/toppers').get(getTopstudents);
studentRouter.route('/').get(getallStudents).post(createStudentdata);
studentRouter.route('/:id').get(getStudent).patch(updateStudent).delete(deleteStudent);
// studentRouter.route()

export default studentRouter;