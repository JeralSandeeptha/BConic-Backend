import { RequestHandler } from "express";
import logger from "../../utils/logger";
import SuccessResponse from "../../utils/SuccessResponse";
import ErrorResponse from "../../utils/ErrorResponse";
import HTTP_STATUS from "../models/enums/HttpStatus";
import db from "../../config/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRequestDTO } from "../models/interfaces/requestDTO/UserRequestDTO";
import { UpdateUserRequestDTO } from "../models/interfaces/requestDTO/UpdateUserRequestDTO";
import { AuthRequestDTO } from "../models/interfaces/requestDTO/AuthRequestDTO";

export const registerUser: RequestHandler = async (req, res) => {
    try {
        const { email, password, first_name, last_name, address, mobile }: UserRequestDTO = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rowCount) {
            logger.error("Already have an user for this email");
            console.log("Already have an user for this email");
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Register user query was falied",
                    "User already exists"
                )
            );
        }

        const now = new Date();

        const newUser = await db.query(
            'INSERT INTO users (email, password, first_name, last_name, address, mobile, created_at, updated_at, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [email, hashedPassword, first_name, last_name, address, mobile, now, now, 'user']
        );


        logger.info("Register user query was successful");
        console.log("Register user query was successful");
        res.status(HTTP_STATUS.CREATED).json(
            new SuccessResponse(
                HTTP_STATUS.CREATED,
                "Register user query was successful",
                newUser.rows[0]
            )
        );
    } catch (error: any) {
        logger.error(`Register user query was failed : ${error.message}`);
        console.log(`Register user query was failed : ${error.message}`);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Register user query was failed",
                error
            )
        );
    }
}

export const registerAdminUser: RequestHandler = async (req, res) => {
    try {
        const { email, password, first_name, last_name, address, mobile }: UserRequestDTO = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rowCount) {
            logger.error("Already have an user for this email");
            console.log("Already have an user for this email");
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Register user query was falied",
                    "User already exists"
                )
            );
        }

        const now = new Date();

        const newUser = await db.query(
            'INSERT INTO users (email, password, first_name, last_name, address, mobile, created_at, updated_at, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [email, hashedPassword, first_name, last_name, address, mobile, now, now, 'admin']
        );


        logger.info("Register user query was successful");
        console.log("Register user query was successful");
        res.status(HTTP_STATUS.OK).json(
            new SuccessResponse(
                HTTP_STATUS.CREATED,
                "Register user query was successful",
                newUser.rows[0]
            )
        );
    } catch (error: any) {
        logger.error(`Register user query was failed : ${error.message}`);
        console.log(`Register user query was failed : ${error.message}`);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Register user query was failed",
                error
            )
        );
    }
}

export const loginUser: RequestHandler = async (req, res) => {
    try {

        const { email, password }: AuthRequestDTO = req.body;

        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            logger.warn("Email is incorrect");
            console.log("Email is incorrect");
            res.status(HTTP_STATUS.NOT_FOUND).json(
                new ErrorResponse(
                    HTTP_STATUS.NOT_FOUND,
                    "User login query was failed",
                    "Email is incorrect"
                )
            );
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            logger.warn("Password is incorrect");
            console.log("Password is incorrect");
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "User login query was failed",
                    "Password is incorrect"
                )
            );
        }

        const token = jwt.sign({ user_id: user.rows[0].user_id, role: user.rows[0].role }, process.env.JWT_SECRET!);

        logger.info("User login query was successful");
        console.log("User login query was successful");
        res.status(HTTP_STATUS.OK).json(
            new SuccessResponse(
                HTTP_STATUS.CREATED,
                "User login query was successful",
                {
                    data: user.rows[0],
                    token: token
                }
            )
        );
    } catch (error: any) {
        logger.error(`User login query was failed : ${error.message}`);
        console.log(`User login query was failed : ${error.message}`);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "User login query was failed",
                error
            )
        );
    }
}

export const getSingleUserById: RequestHandler = async (req, res) => {
    try {

        const { userId } = req.params;

        if (!userId) {
            logger.error("UserId not found");
            console.log("UserId not found");
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Get single user query was failed",
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
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Get single user query was failed",
                    "User not found"
                )
            );
        }

        logger.info("Get single user query was successful");
        console.log("Get single user query was successful");
        res.status(HTTP_STATUS.OK).json(
            new SuccessResponse(
                HTTP_STATUS.OK,
                "Get single user query was successful",
                existingUser.rows[0]
            )
        );
    } catch (error: any) {
        logger.error(`Get single user query was failed : ${error.message}`);
        console.log(`Get single user query was failed : ${error.message}`);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Get single user query was failed",
                error
            )
        );
    }
}

export const updateUser: RequestHandler = async (req, res) => {
    try {

        const { userId } = req.params;

        const { first_name, last_name, address, mobile }: UpdateUserRequestDTO = req.body;

        if (!userId) {
            logger.error("UserId not found");
            console.log("UserId not found");
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Update user query was failed",
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
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Update user query was failed",
                    "User not found"
                )
            );
        }

        const updatedFields = [];
        const values = [];

        if (first_name) {
            updatedFields.push('first_name = $' + (values.length + 1));
            values.push(first_name);
        }

        if (last_name) {
            updatedFields.push('last_name = $' + (values.length + 1));
            values.push(last_name);
        }

        if (address) {
            updatedFields.push('address = $' + (values.length + 1));
            values.push(address);
        }

        if (mobile) {
            updatedFields.push('mobile = $' + (values.length + 1));
            values.push(mobile);
        }

        const updatedAt = new Date();
        updatedFields.push('updated_at = $' + (values.length + 1));
        values.push(updatedAt);

        if (updatedFields.length === 0) {
            logger.warn("No fields to update in user");
            console.log("No fields to update in user");
            res.status(HTTP_STATUS.NO_CONTENT).json(
                new ErrorResponse(
                    HTTP_STATUS.NOT_FOUND,
                    "Update user query was aborted",
                    "No fields to update in user"
                )
            );
        }

        const updateQuery = `
            UPDATE users 
            SET ${updatedFields.join(', ')} 
            WHERE user_id = $${values.length + 1}
            RETURNING *`;

        values.push(userId);

        const updatedUser = await db.query(updateQuery, values);

        logger.info("Update user query was successful");
        console.log("Update user query was successful");
        res.status(HTTP_STATUS.OK).json(
            new SuccessResponse(
                HTTP_STATUS.OK,
                "Update user query was successful",
                updatedUser.rows[0]
            )
        );
    } catch (error: any) {
        logger.error(`Update user query was failed : ${error.message}`);
        console.log(`Update user query was failed : ${error.message}`);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Update user query was failed",
                error
            )
        );
    }
}

export const deleteUser: RequestHandler = async (req, res) => {
    try {

        const { userId } = req.params;

        if (!userId) {
            logger.error("UserId not found");
            console.log("UserId not found");
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Delete user query was failed",
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
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Delete single user query was failed",
                    "User not found"
                )
            );
        }

        await db.query(
            'DELETE FROM users WHERE user_id = $1',
            [userId]
        );

        logger.info("Delete user query was successful");
        console.log("Delete user query was successful");
        res.status(HTTP_STATUS.NO_CONTENT).json(
            new SuccessResponse(
                HTTP_STATUS.NO_CONTENT,
                "Delete user query was successful",
                "Delete user query was successful"
            )
        );
    } catch (error: any) {
        logger.error(`Delete user query was failed : ${error.message}`);
        console.log(`Delete user query was failed : ${error.message}`);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Delete user query was failed",
                error
            )
        );
    }
}
