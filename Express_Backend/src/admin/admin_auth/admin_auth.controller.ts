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

        error_response = ErrorResponseStructure(error.message);

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

        error_response = ErrorResponseStructure(error.message);

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

        error_response = ErrorResponseStructure(error.message);

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

      const service_data = this.adminAuthService.RefreshAccessTokenService({
        refresh_token,
      });

      return res.status(200);
    } catch (error) {
      let error_response;
      if (error instanceof ZodError) {
        console.error(error);

        error_response = ErrorResponseStructure(error.message);

        return res.status(400).json(error_response);
      }

      const public_message =
        "Something went wrong on our end. Please try again later.";

      error_response = ErrorResponseStructure(public_message);
      return res.status(500).json(error_response);
    }
  }
}
