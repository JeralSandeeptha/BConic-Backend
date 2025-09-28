import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from '../models/interfaces/requestDTO/JwtPayload';
import { JWT_SECRET } from '../../config/jwtConfig';

dotenv.config({ path: "../../.env.local" })

// Middleware to check token validity and role (admin or user)
export const authenticateToken: RequestHandler = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1]; // Format: "Bearer <token>"

    // Check if the token exists
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    try {
        // Verify token validity
        const decoded = jwt.verify(token, JWT_SECRET) as unknown as JwtPayload;

        // Attach the user information to the request
        req.user = {
            user_id: decoded.user_id,
            role: decoded.role,
        };

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Handle invalid token case
        res.status(403).json({ message: 'Invalid token.' });
    }
};

// Middleware to check if the user is admin
export const authorizeAdmin: RequestHandler = (req, res, next) => {
    // Check if the user is an admin
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};