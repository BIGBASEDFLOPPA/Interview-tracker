import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import usersRouter from "./routes/users.route";
import { authMiddleware } from "./middleware/auth.middleware";
import interviewsRouter from "./routes/interviews.route";
import dashboardRoutes from "./routes/dashboard.route";
import theoryRoutes from './routes/theory.route';
import {errorMiddleware} from "./middleware/error.middleware";
import cookieParser from 'cookie-parser';
import codingTaskRoute from "./routes/coding-task.route";

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use("/auth", authRouter);
app.use("/api/users", authMiddleware, usersRouter);
app.use("/api/interviews", authMiddleware, interviewsRouter);
app.use("/api/interview-coding",authMiddleware,codingTaskRoute);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);
app.use('/api/theory', authMiddleware, theoryRoutes);
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Сервер работает!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});
