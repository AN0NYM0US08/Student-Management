import express from "express";
import studentRouter from "./routes/studentsRoutes.js";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
//the home
app.use("/clg/students", studentRouter);

export default app;
