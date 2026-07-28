import type { ArtisanService } from "./artisan.service.js";
import type { Request, Response } from "express";

import {
  artisanBookingRequestResponseController_RequestBodyValidation,
  artisanBookingRequestResponseController_RequestParamValidation,
  getArtisanByIdController_RequestParamValidation,
  getArtisanIncomingBookingRequestsController_RequestParamValidation,
} from "./artisan.validation.js";

import {
  ErrorResponseStructure,
  SuccessResponseStructure,
} from "../utils/response_helper.js";

import { ZodError } from "zod";

export class ArtisanController {
  constructor(private readonly artisanService: ArtisanService) {}

  async getArtisanByIdController(req: Request, res: Response) {
    try {
      const validated_param =
        getArtisanByIdController_RequestParamValidation.parse(req.params);

      const { artisan_id } = validated_param;
      const service_data = this.artisanService.getArtisanByIdService({
        artisan_id,
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

      const public_message =
        "Something went wrong on our end. Please try again later.";

      error_response = ErrorResponseStructure(public_message);
      return res.status(500).json(error_response);
    }
  }

  async getArtisanIncomingBookingRequestsController(
    req: Request,
    res: Response,
  ) {
    try {
      const validated_param =
        getArtisanIncomingBookingRequestsController_RequestParamValidation.parse(
          req.params,
        );

      const { artisan_id } = validated_param;

      const service_data =
        this.artisanService.getArtisanIncomingBookingRequestsService({
          artisan_id,
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

      const public_message =
        "Something went wrong on our end. Please try again later.";

      error_response = ErrorResponseStructure(public_message);
      return res.status(500).json(error_response);
    }
  }

  async artisanBookingRequestResponseController(req: Request, res: Response) {
    try {
      const validated_param =
        artisanBookingRequestResponseController_RequestParamValidation.parse(
          req.params,
        );
      const validated_body =
        artisanBookingRequestResponseController_RequestBodyValidation.parse(
          req.body,
        );

      const { artisan_id, booking_id } = validated_param;
      const { artisan_response } = validated_body;

      const service_data =
        this.artisanService.artisanBookingRequestResponseService({
          artisan_booking_response: artisan_response,
          artisan_id,
          booking_id,
        });

      const success_response = SuccessResponseStructure(service_data);

      return res.status(201).json(success_response);
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

  async next(req: Request, res: Response) {
    try {
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
}
