import { Router } from "express";
import { createCourier, deleteCourier, getAllCouriers, getAllCouriersByUserId, getSingleCourierById, updateCourier } from "../controllers/courier.controller";
import { authenticateToken, authorizeAdmin } from "../middlewares/middleware";

const router = Router();

// courier routes
router.post('/createCourier', authenticateToken, createCourier);
router.get('/getCourierById/:courierId', authenticateToken, getSingleCourierById);
router.get('/getAllCouriers', authenticateToken, getAllCouriers);
router.get('/getCouriersByUserId/:userId', authenticateToken, getAllCouriersByUserId);
router.put('/updateByCourierId/:courierId', authenticateToken, updateCourier);
router.delete('/deleteByCourierId/:courierId', authorizeAdmin, deleteCourier);

export default router;