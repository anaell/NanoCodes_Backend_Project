import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { accessTokenVerifier } from "./admin_auth/utils/jwt_verify.js";

export const verifyAdminJWTMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ error: "Access token required" });
    }

    const decoded = accessTokenVerifier({ token: accessToken });

    next();
  } catch (error: any) {
    // Handle JWT-specific errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Unexpected errors
    // console.error("Unexpected JWT error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
