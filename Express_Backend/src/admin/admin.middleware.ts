import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { accessTokenVerifier } from "./admin_auth/utils/jwt_verify.js";
import { ErrorResponseStructure } from "../utils/response_helper.js";

export const verifyAdminJWTMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      const error_message = "Access token required";
      const error_response = ErrorResponseStructure(error_message);

      return res.status(401).json(error_response);
    }

    const decoded = accessTokenVerifier({ token: accessToken });

    req.user = decoded;

    next();
  } catch (error: any) {
    // Handle JWT-specific errors
    if (error.name === "TokenExpiredError") {
      const error_message = "Token expired";
      const error_response = ErrorResponseStructure(error_message);

      return res.status(401).json(error_response);
    }

    if (error.name === "JsonWebTokenError") {
      const error_message = "Invalid token";
      const error_response = ErrorResponseStructure(error_message);

      return res.status(401).json(error_response);
    }

    // Unexpected errors
    // console.error("Unexpected JWT error:", error);
    const error_message = "Something went wrong";
    const error_response = ErrorResponseStructure(error_message);

    return res.status(500).json(error_response);
  }
};
