import { Router } from "express";
import userService from "../services/user.service";

const router = Router();

router.get("/", async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
});

router.get("/current-user", async (req, res) => {
    const userId = req.user!.id;

    const user = await userService.getCurrentUser(userId);
    res.json(user);
});

export default router;
