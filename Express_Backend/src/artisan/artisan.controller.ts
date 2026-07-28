import type { ArtisanService } from "./artisan.service.js";
import type { Request, Response } from "express";
import {
  getArtisanByIdController_RequestParamValidation,
  getArtisanIncomingJobRequestsController_RequestParamValidation,
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

  async getArtisanIncomingJobRequestsController(req: Request, res: Response) {
    try {
      const validated_param =
        getArtisanIncomingJobRequestsController_RequestParamValidation.parse(
          req.params,
        );

      const { artisan_id } = validated_param;

      const service_data =
        this.artisanService.getArtisanIncomingJobRequestsService({
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
