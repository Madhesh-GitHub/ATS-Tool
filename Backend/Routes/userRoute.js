import express from 'express';
import { signup, login } from '../Controllers/userController.js';
import { googleLogin } from "../Controllers/userController.js";

const router = express.Router();

// POST /api/users/signup
router.post('/signup', signup);

// POST /api/users/login
router.post('/login', login);

router.post("/google-login", googleLogin);


export default router;