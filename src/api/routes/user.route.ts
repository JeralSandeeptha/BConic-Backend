import { Router } from "express";
import { registerUser, loginUser, registerAdminUser, updateUser, getSingleUserById, deleteUser } from "../controllers/user.controller";

const router = Router();

// users routes
router.post('/register', registerUser);
router.post('/registerAdmin', registerAdminUser);
router.post('/login', loginUser);
router.get('/getUserById/:userId', getSingleUserById);
router.put('/updateByUserId/:userId', updateUser);
router.delete('/deleteByUserId/:userId', deleteUser);

export default router;