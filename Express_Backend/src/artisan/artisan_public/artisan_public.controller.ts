import { ZodError } from "zod";
import {
  ErrorResponseStructure,
  SuccessResponseStructure,
} from "../../utils/response_helper.js";

import type { PublicArtisanService } from "./artisan_public.service.js";
import type { Request, Response } from "express";
import {
  getArtisanByIdController_RequestParamValidation,
  getArtisanCompletedBookingsController_RequestParamValidation,
  getArtisanCompletedBookingsController_RequestQueryValidation,
  getArtisanReviewsController_RequestParamValidation,
  getArtisanReviewsController_RequestQueryValidation,
  getArtisansController_RequestQueryValidation,
} from "./artisan_public.validation.js";

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

  async getArtisanByIdController(req: Request, res: Response) {
    try {
      const validated_param =
        getArtisanByIdController_RequestParamValidation.parse(req.params);

      const { artisan_id } = validated_param;

      const service_data =
        await this.publicArtisanService.getArtisanByIdService({ artisan_id });

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

  async getArtisanCompletedBookingsController(req: Request, res: Response) {
    try {
      const validated_param =
        getArtisanCompletedBookingsController_RequestParamValidation.parse(
          req.params,
        );
      const validated_query =
        getArtisanCompletedBookingsController_RequestQueryValidation.parse(
          req.query,
        );

      const { artisan_id } = validated_param;
      const { limit, page } = validated_query;

      const service_data =
        await this.publicArtisanService.getArtisanCompletedBookingsService({
          artisan_id,
          limit,
          page,
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

  async getArtisanReviewsController(req: Request, res: Response) {
    try {
      const validated_param =
        getArtisanReviewsController_RequestParamValidation.parse(req.params);
      const validated_query =
        getArtisanReviewsController_RequestQueryValidation.parse(req.query);

      const { artisan_id } = validated_param;
      const { limit, page } = validated_query;

      const service_data =
        await this.publicArtisanService.getArtisanReviewsService({
          artisan_id,
          limit,
          page,
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

  async getArtisansController(req: Request, res: Response) {
    try {
      const validated_query =
        getArtisansController_RequestQueryValidation.parse(req.query);

      const { experience, limit, location, min_rating, page, q } =
        validated_query;

      const service_data = await this.publicArtisanService.getArtisansService({
        experience,
        limit,
        location,
        min_rating,
        page,
        search_term: q,
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
}
