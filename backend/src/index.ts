import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import { authMiddleware } from "./middleware/auth";
import interviewsRouter from "./routes/interviews";
import interviewEntriesRouter from "./routes/interviewEntries";
import dashboardRoutes from "./routes/dashboard";
import theoryRoutes from './routes/theory';
import livecodingRoutes from './routes/livecoding';
import {errorMiddleware} from "./middleware/error.middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/api/users", authMiddleware, usersRouter);
app.use("/api/interviews", authMiddleware, interviewsRouter);
app.use("/api/interview-entries", authMiddleware, interviewEntriesRouter);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);
app.use('/api/theory', authMiddleware, theoryRoutes);
app.use('/api/livecoding', authMiddleware, livecodingRoutes);
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Сервер работает!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});
