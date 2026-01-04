import { Router } from "express";
import userService from "../services/user.service";

const router = Router();

router.get("/", async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
});

export default router;
