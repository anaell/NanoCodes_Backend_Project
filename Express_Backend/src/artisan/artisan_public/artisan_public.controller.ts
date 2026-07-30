import { ZodError } from "zod";
import {
  ErrorResponseStructure,
  SuccessResponseStructure,
} from "../../utils/response_helper.js";

import type { PublicArtisanService } from "./artisan_public.service.js";
import type { Request, Response } from "express";

export class PublicArtisanController {
  constructor(private readonly publicArtisanService: PublicArtisanService) {}

  async getFeaturedArtisansController(req: Request, res: Response) {
    try {
      const service_data =
        await this.publicArtisanService.getFeaturedArtisansService();

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
      // const success_response = SuccessResponseStructure(service_data);
      // return res.status(200).json(success_response)
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
