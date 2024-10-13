import { Router } from "express";
import { createCourier, deleteCourier, getAllCouriers, getAllCouriersByUserId, getSingleCourierById, updateCourier } from "../controllers/courier.controller";

const router = Router();

// courier routes
router.post('/createCourier', createCourier);
router.get('/getCourierById/:courierId', getSingleCourierById);
router.get('/getAllCouriers', getAllCouriers);
router.get('/getCouriersByUserId/:userId', getAllCouriersByUserId);
router.put('/updateByCourierId/:courierId', updateCourier);
router.delete('/deleteByCourierId/:courierId', deleteCourier);

export default router;