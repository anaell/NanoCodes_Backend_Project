import type { ArtisanService } from "./artisan.service.js";
import type { Request, Response } from "express";

import {
  artisanBookingRequestResponseController_RequestBodyValidation,
  artisanBookingRequestResponseController_RequestParamValidation,
  createOrUpdateArtisanReplyToReviewController_RequestBodyValidation,
  createOrUpdateArtisanReplyToReviewController_RequestParamValidation,
  getArtisanBookingHistoryController_RequestParamValidation,
  getArtisanBookingHistoryController_RequestQueryValidation,
  getArtisanByIdController_RequestParamValidation,
  getArtisanEarningsStatsCardController_RequestParamValidation,
  getArtisanEarningsTrendDataController_RequestParamValidation,
  getArtisanEarningsTrendDataController_RequestQueryValidation,
  getArtisanIncomingBookingRequestsController_RequestParamValidation,
  getArtisanReviewAndRatingStatsController_RequestParamValidation,
  getArtisanReviewsAndRatingController_RequestParamValidation,
  getArtisanReviewsAndRatingController_RequestQueryValidation,
  getArtisanTransactionsController_RequestParamValidation,
  getArtisanTransactionsController_RequestQueryValidation,
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
      const service_data = await this.artisanService.getArtisanByIdService({
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
        await this.artisanService.getArtisanIncomingBookingRequestsService({
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
        await this.artisanService.artisanBookingRequestResponseService({
          artisan_booking_response: artisan_response,
          artisan_id,
          booking_id,
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

  async getArtisanBookingHistoryController(req: Request, res: Response) {
    try {
      const validated_param =
        getArtisanBookingHistoryController_RequestParamValidation.parse(
          req.params,
        );
      const validated_query =
        getArtisanBookingHistoryController_RequestQueryValidation.parse(
          req.query,
        );

      const { artisan_id } = validated_param;
      const { booking_status, days, limit, page } = validated_query;

      const service_data =
        await this.artisanService.getArtisanBookingHistoryService({
          artisan_id,
          booking_status,
          limit,
          no_of_days: days,
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

  async getArtisanReviewsAndRatingController(req: Request, res: Response) {
    try {
      const validated_param =
        getArtisanReviewsAndRatingController_RequestParamValidation.parse(
          req.params,
        );
      const validated_query =
        getArtisanReviewsAndRatingController_RequestQueryValidation.parse(
          req.query,
        );

      const { artisan_id } = validated_param;
      const { limit, page } = validated_query;

      const service_data =
        await this.artisanService.getArtisanReviewsAndRatingService({
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

  async getArtisanReviewAndRatingStatsController(req: Request, res: Response) {
    try {
      const validated_param =
        getArtisanReviewAndRatingStatsController_RequestParamValidation.parse(
          req.params,
        );

      const { artisan_id } = validated_param;

      const service_data =
        await this.artisanService.getArtisanReviewAndRatingStatsService({
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

  async createOrUpdateArtisanReplyToReviewController(
    req: Request,
    res: Response,
  ) {
    try {
      const validated_param =
        createOrUpdateArtisanReplyToReviewController_RequestParamValidation.parse(
          req.params,
        );
      const validated_body =
        createOrUpdateArtisanReplyToReviewController_RequestBodyValidation.parse(
          req.body,
        );

      const { artisan_id, review_id } = validated_param;
      const { reply } = validated_body;

      const service_data =
        await this.artisanService.createOrUpdateArtisanReplyToReviewService({
          artisan_id,
          reply,
          review_id,
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

  async getArtisanEarningsStatsCardController(req: Request, res: Response) {
    try {
      const validated_param =
        getArtisanEarningsStatsCardController_RequestParamValidation.parse(
          req.params,
        );

      const { artisan_id } = validated_param;

      const service_data =
        await this.artisanService.getArtisanEarningsStatsCardService({
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

  async getArtisanEarningsTrendDataController(req: Request, res: Response) {
    try {
      const validated_param =
        getArtisanEarningsTrendDataController_RequestParamValidation.parse(
          req.params,
        );
      const validated_query =
        getArtisanEarningsTrendDataController_RequestQueryValidation.parse(
          req.query,
        );

      const { artisan_id } = validated_param;
      const { days } = validated_query;

      const service_data =
        await this.artisanService.getArtisanEarningsTrendDataService({
          artisan_id,
          no_of_days: days,
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

  async getArtisanTransactionsController(req: Request, res: Response) {
    try {
      const validated_param =
        getArtisanTransactionsController_RequestParamValidation.parse(
          req.params,
        );
      const validated_query =
        getArtisanTransactionsController_RequestQueryValidation.parse(
          req.query,
        );

      const { artisan_id } = validated_param;
      const { recent } = validated_query;

      const service_data =
        await this.artisanService.getArtisanTransactionsService({
          artisan_id,
          recent,
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
