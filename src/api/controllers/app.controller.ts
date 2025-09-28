import logger from "../../utils/logger";
import SuccessResponse from "../../utils/SuccessResponse";
import ErrorResponse from "../../utils/ErrorResponse";
import HTTP_STATUS from "../models/enums/HttpStatus";
import { RequestHandler } from "express";

const getApplication: RequestHandler = (_req, res) => {
    try {
        logger.info("Welcome to Courier Service API");
        console.log("Welcome to Courier Service API");
        res.status(HTTP_STATUS.OK).json(
            new SuccessResponse(
                HTTP_STATUS.OK,
                "Application API checking query was success",
                "Application API checking query was success"
            )
        );
    } catch (error: any) {
        logger.error(error.message);
        console.log(error.message);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Application API checking query was failed",
                error
            )
        );
    }
}

export default getApplication;