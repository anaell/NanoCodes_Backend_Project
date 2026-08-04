import { ZodError } from "zod";
import type { Request, Response } from "express";
import type { AdminAuthService } from "./admin_auth.service.js";

import {
  ErrorResponseStructure,
  SuccessResponseStructure,
} from "../../utils/response_helper.js";
import {
  LoginController_RequestBodyValidator,
  SignupController_RequestBodyValidator,
} from "./admin_auth.validation.js";
import jwt from "jsonwebtoken";

export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  async LoginController(req: Request, res: Response) {
    try {
      const validated_body =
        await LoginController_RequestBodyValidator.parseAsync(req.body);

      const { email, password } = validated_body;

      const service_data = await this.adminAuthService.LoginService({
        email,
        password,
      });

      const data_sent_back = {
        name: service_data.name,
        email: service_data.email,
        token: service_data.token,
        id: service_data.admin_id,
      };

      const success_response = SuccessResponseStructure(data_sent_back);

      return res
        .status(200)
        .cookie("refreshToken", service_data.refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json(success_response);
    } catch (error) {
      let error_response;
      if (error instanceof ZodError) {
        console.error(error);

        // Option A: Extract an array of readable issues natively supported in Zod 4
        const formatted_errors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        error_response = ErrorResponseStructure(formatted_errors);

        return res.status(400).json(error_response);
      }

      const public_message =
        "Something went wrong on our end. Please try again later.";

      error_response = ErrorResponseStructure(public_message);
      return res.status(500).json(error_response);
    }
  }

  async SignupController(req: Request, res: Response) {
    try {
      const validated_body =
        await SignupController_RequestBodyValidator.parseAsync(req.body);

      const { email, name, password } = validated_body;

      const service_data = await this.adminAuthService.SignupService({
        email,
        name,
        password,
      });

      const data_sent_back = {
        name: service_data.name,
        token: service_data.token,
        email: service_data.email,
        id: service_data.admin_id,
      };

      const success_response = SuccessResponseStructure(data_sent_back);

      res
        .status(201)
        .cookie("refreshToken", service_data.refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json(success_response);
    } catch (error) {
      let error_response;
      if (error instanceof ZodError) {
        console.error(error);

        // Option A: Extract an array of readable issues natively supported in Zod 4
        const formatted_errors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        error_response = ErrorResponseStructure(formatted_errors);

        return res.status(400).json(error_response);
      }

      const public_message =
        "Something went wrong on our end. Please try again later.";

      error_response = ErrorResponseStructure(public_message);
      return res.status(500).json(error_response);
    }
  }

  async LogoutController(req: Request, res: Response) {
    try {
      const data_sent_back = { message: "Logout Successful" };
      const success_response = SuccessResponseStructure(data_sent_back);
      res.status(200).clearCookie("refreshToken").json(success_response);
    } catch (error) {
      let error_response;
      if (error instanceof ZodError) {
        console.error(error);

        // Option A: Extract an array of readable issues natively supported in Zod 4
        const formatted_errors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        error_response = ErrorResponseStructure(formatted_errors);

        return res.status(400).json(error_response);
      }

      const public_message =
        "Something went wrong on our end. Please try again later.";

      error_response = ErrorResponseStructure(public_message);
      return res.status(500).json(error_response);
    }
  }

  async RefreshAccessTokenController(req: Request, res: Response) {
    try {
      const refresh_token = req.cookies.refreshToken;

      if (!refresh_token) {
        const error_message = "Login again";
        const error_response = ErrorResponseStructure(error_message);

        return res.status(401).json(error_response);
      }

      const service_data =
        await this.adminAuthService.RefreshAccessTokenService({
          refresh_token,
        });

      const success_response = SuccessResponseStructure(service_data);

      return res.status(200).json(success_response);
    } catch (error) {
      let error_response;
      if (error instanceof ZodError) {
        console.error(error);

        // Option A: Extract an array of readable issues natively supported in Zod 4
        const formatted_errors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        error_response = ErrorResponseStructure(formatted_errors);

        return res.status(400).json(error_response);
      }

      // Handle JWT-specific errors
      if (
        error instanceof jwt.TokenExpiredError &&
        error.name === "TokenExpiredError"
      ) {
        const error_message = "Token expired";
        const error_response = ErrorResponseStructure(error_message);

        return res.status(401).json(error_response);
      }

      if (
        error instanceof jwt.JsonWebTokenError &&
        error.name === "JsonWebTokenError"
      ) {
        const error_message = "Invalid token";
        const error_response = ErrorResponseStructure(error_message);

        return res.status(401).json(error_response);
      }

      const public_message =
        "Something went wrong on our end. Please try again later.";

      error_response = ErrorResponseStructure(public_message);
      return res.status(500).json(error_response);
    }
  }
}
