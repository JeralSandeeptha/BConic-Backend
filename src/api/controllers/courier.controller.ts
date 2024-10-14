import { Response, Request } from "express";
import logger from "../../utils/logger";
import SuccessResponse from "../../utils/SuccessResponse";
import ErrorResponse from "../../utils/ErrorResponse";
import HTTP_STATUS from "../models/enums/HttpStatus";
import { v4 as uuidv4 } from 'uuid';
import db from "../../config/db";
import { CourierRequestDTO } from "../models/interfaces/requestDTO/CourierRequestDTO";
import CourierStatus from "../models/enums/CourierStatus";

const generateTrackingNumber = (): string => {
    const timestamp = Date.now().toString();
    const randomPart = Math.floor(Math.random() * 10000).toString();
    return `TRK-${timestamp}-${randomPart}`;
};

export const createCourier = async (req: Request, res: Response) => {
    try {
        const { senderName, senderAddress, recepientName, recepientAddress, additionalInfo, mobile, user_id }: CourierRequestDTO = req.body;

        const now = new Date();
        const trackingNumber = uuidv4();

        const newCourier = await db.query(
            'INSERT INTO couriers (tracking_number, user_id, sender_name, sender_address, mobile, recipient_name, recipient_address, additional_info, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [trackingNumber, user_id, senderName, senderAddress, mobile, recepientName, recepientAddress, additionalInfo, CourierStatus.ORDER_PLACED, now, now]
        );

        logger.info("Create courier query was successful");
        console.log("Create courier query was successful");
        return res.status(HTTP_STATUS.CREATED).json(
            new SuccessResponse(
                HTTP_STATUS.CREATED,
                "Create courier query was successful",
                newCourier.rows[0]
            )
        );
    } catch (error: any) {
        logger.error(`Create courier query was failed : ${error.message}`);
        console.log(`Create courier query was failed : ${error.message}`);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Create courier query was failed",
                error
            )
        );
    }
}

export const getSingleCourierById = async (req: Request, res: Response) => {
    try {

        const { courierId } = req.params;

        if (!courierId) {
            logger.error("CourierId not found");
            console.log("CourierId not found");
            return res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Get single courier query was failed",
                    "CourierId not found"
                )
            );
        }

        const existingCourier = await db.query(
            'SELECT * FROM couriers WHERE courier_id = $1',
            [courierId]
        );

        if (!existingCourier.rowCount) {
            logger.error("Courier not found");
            console.log("Courier not found");
            return res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Get single courier query was failed",
                    "Courier not found"
                )
            );
        }

        logger.info("Get single courier query was successful");
        console.log("Get single courier query was successful");
        return res.status(HTTP_STATUS.OK).json(
            new SuccessResponse(
                HTTP_STATUS.OK,
                "Get single courier query was successful",
                existingCourier.rows[0]
            )
        );
    } catch (error: any) {
        logger.error(`Get single courier query was failed : ${error.message}`);
        console.log(`Get single courier query was failed : ${error.message}`);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Get single courier query was failed",
                error
            )
        );
    }
}

export const deleteCourier = async (req: Request, res: Response) => {
    try {

        const { courierId } = req.params;

        if (!courierId) {
            logger.error("CourierId not found");
            console.log("CourierId not found");
            return res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Delete courier query was failed",
                    "CourierId not found"
                )
            );
        }

        const existingCourier = await db.query(
            'SELECT * FROM couriers WHERE courier_id = $1',
            [courierId]
        );

        if (!existingCourier.rowCount) {
            logger.error("Courier not found");
            console.log("Courier not found");
            return res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Delete courier query was failed",
                    "Courier not found"
                )
            );
        }

        await db.query(
            'DELETE FROM couriers WHERE courier_id = $1',
            [courierId]
        );

        logger.info("Delete courier query was successful");
        console.log("Delete courier query was successful");
        return res.status(HTTP_STATUS.NO_CONTENT).json(
            new SuccessResponse(
                HTTP_STATUS.NO_CONTENT,
                "Delete courier query was successful",
                "Delete courier query was successful",
            )
        );
    } catch (error: any) {
        logger.error(`Delete courier query was failed : ${error.message}`);
        console.log(`Delete courier query was failed : ${error.message}`);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Delete courier query was failed",
                error
            )
        );
    }
}

export const getAllCouriersByUserId = async (req: Request, res: Response) => {
    try {

        const { userId } = req.params;

        if (!userId) {
            logger.error("UserId not found");
            console.log("UserId not found");
            return res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Get all couriers by userId query was failed",
                    "UserId not found"
                )
            );
        }

        const existingUser = await db.query(
            'SELECT * FROM users WHERE user_id = $1',
            [userId]
        );

        if (!existingUser.rowCount) {
            logger.error("User not found");
            console.log("User not found");
            return res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Get all couriers by userId query was failed",
                    "User not found"
                )
            );
        }

        const couriersData = await db.query(
            'SELECT * FROM couriers WHERE user_id = $1',
            [userId]
        );

        logger.info("Get all couriers by userId user query was successful");
        console.log("Get all couriers by userId user query was successful");
        return res.status(HTTP_STATUS.OK).json(
            new SuccessResponse(
                HTTP_STATUS.OK,
                "Get all couriers by userId user query was successful",
                couriersData.rows
            )
        );
    } catch (error: any) {
        logger.error(`Get all couriers by userId user query was failed : ${error.message}`);
        console.log(`Get all couriers by userId user query was failed : ${error.message}`);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Get all couriers by userId user query was failed",
                error
            )
        );
    }
}

export const updateCourier = async (req: Request, res: Response) => {
    try {

        const { courierId } = req.params;
        const { status } = req.body;

        if (!courierId) {
            logger.error("CourierId not found");
            console.log("CourierId not found");
            return res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Update courier query was failed",
                    "CourierId not found"
                )
            );
        }

        const existingCourier = await db.query(
            'SELECT * FROM couriers WHERE courier_id = $1',
            [courierId]
        );

        if (!existingCourier.rowCount) {
            logger.error("Courier not found");
            console.log("Courier not found");
            return res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Update courier query was failed",
                    "Courier not found"
                )
            );
        }

        const now = new Date();

        const couriersData = await db.query(
            'UPDATE couriers SET status = $1 , updated_at = CURRENT_TIMESTAMP WHERE courier_id = $2',
            [status, courierId]
        );

        logger.info("Update courier query was successful");
        console.log("Update courier query was successful");
        return res.status(HTTP_STATUS.OK).json(
            new SuccessResponse(
                HTTP_STATUS.OK,
                "Update courier query was successful",
                "Update courier query was successful",
            )
        );
    } catch (error: any) {
        logger.error(`Update courier query was failed : ${error.message}`);
        console.log(`Update courier query was failed : ${error.message}`);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Update courier query was failed",
                error
            )
        );
    }
}

export const getAllCouriers = async (req: Request, res: Response) => {
    try {

        const newCourier = await db.query(
            'SELECT * FROM couriers'    
        );

        logger.info("Get all couriers query was successful");
        console.log("Get all couriers query was successful");
        return res.status(HTTP_STATUS.CREATED).json(
            new SuccessResponse(
                HTTP_STATUS.CREATED,
                "Get all couriers query was successful",
                newCourier.rows
            )
        );
    } catch (error: any) {
        logger.error(`Get all couriers query was failed : ${error.message}`);
        console.log(`Get all couriers query was failed : ${error.message}`);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Get all couriers query was failed",
                error
            )
        );
    }
}