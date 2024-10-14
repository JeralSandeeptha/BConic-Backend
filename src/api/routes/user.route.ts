import { Router } from "express";
import { registerUser, loginUser, registerAdminUser, updateUser, getSingleUserById, deleteUser } from "../controllers/user.controller";
import { authenticateToken, authorizeAdmin } from "../middlewares/middleware";

const router = Router();

// users routes
router.post('/register', registerUser);
router.post('/registerAdmin', registerAdminUser);
router.post('/login', loginUser);
router.get('/getUserById/:userId', authenticateToken, getSingleUserById);
router.put('/updateByUserId/:userId', authenticateToken, updateUser);
router.delete('/deleteByUserId/:userId', authorizeAdmin, deleteUser);

export default router;