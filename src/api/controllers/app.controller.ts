import { Response, Request } from "express";
import logger from "../../utils/logger";
import SuccessResponse from "../../utils/SuccessResponse";
import ErrorResponse from "../../utils/ErrorResponse";
import HTTP_STATUS from "../models/enums/HttpStatus";

const getApplication = (_req: Request, res: Response) => {
    try {
        logger.info("Welcome to Courier Service API");
        console.log("Welcome to Courier Service API");
        return res.status(HTTP_STATUS.OK).json(
            new SuccessResponse(
                HTTP_STATUS.OK,
                "Application API checking query was success 1",
                "Application API checking query was success 1"
            )
        );
    } catch (error: any) {
        logger.error(error.message);
        console.log(error.message);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Application API checking query was failed",
                error
            )
        );
    }
}

export default getApplication;