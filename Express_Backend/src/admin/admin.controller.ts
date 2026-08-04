import {
  ErrorResponseStructure,
  SuccessResponseStructure,
} from "../utils/response_helper.js";
import type { Request, Response } from "express";
import type { AdminService } from "./admin.service.js";
import {
  deletePlatformUser_RequestValidation,
  getAllBookings_RequestQueryValidation,
  getAllReviews_RequestQueryValidation,
  getAllTransactionLogs_RequestQueryValidation,
  getArtisanPendingDocumentVerificationRequest_RequestParamValidation,
  getPlatformStatsController_RequestQueryValidation,
  getPlatformUsersController_RequestValidation,
  getRevenueTrend_RequestQueryValidation,
  reviewArtisanDocumentVerificationRequest_RequestBodyValidation,
  reviewArtisanDocumentVerificationRequest_RequestParamValidation,
  updatePlatformSettings_RequestBodyValidation,
} from "./admin.validation.js";
import { ZodError } from "zod";

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  async getPlatformStatsController(req: Request, res: Response) {
    try {
      const validated_query =
        getPlatformStatsController_RequestQueryValidation.parse(req.query);

      const days = validated_query.days;

      const service_data =
        await this.adminService.getPlatformStatsService(days);

      const success_response = SuccessResponseStructure(service_data);

      return res.status(200).json({ ...success_response });
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

  async getPlatformUsersController(req: Request, res: Response) {
    try {
      const validated_query =
        getPlatformUsersController_RequestValidation.parse(req.query);

      const {
        role,
        status,
        q,
        page,
        limit,
        artisan_document_verification_status,
      } = validated_query;

      // Build an object and dynamically omit keys if their value is undefined
      const service_data = await this.adminService.getPlatformUsersService({
        role,
        search_term: q,
        status,
        page,
        limit,
        artisan_document_verification_status,
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

  async deletePlatformUserController(req: Request, res: Response) {
    try {
      const validated_param = deletePlatformUser_RequestValidation.parse(
        req.params,
      );

      const { user_id } = validated_param;

      await this.adminService.deletePlatformUserService({
        user_id,
      });

      // const success_response = SuccessResponseStructure(service_data);

      // res.status(204).json(success_response);
      return res.status(204).send();
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

  async reviewArtisanDocumentVerificationRequestController(
    req: Request,
    res: Response,
  ) {
    try {
      const validated_body =
        reviewArtisanDocumentVerificationRequest_RequestBodyValidation.parse(
          req.body,
        );

      const { application_status_chosen } = validated_body;

      const validated_param =
        reviewArtisanDocumentVerificationRequest_RequestParamValidation.parse(
          req.params,
        );

      const { artisan_id } = validated_param;

      const service_data =
        await this.adminService.reviewArtisanDocumentVerificationRequestService(
          {
            artisan_id,
            application_status_chosen,
          },
        );

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

  async getAllArtisansWithPendingDocumentVerificationRequestController(
    req: Request,
    res: Response,
  ) {
    try {
      const service_data =
        await this.adminService.getAllArtisansWithPendingDocumentVerificationRequestService();

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
  async getArtisanPendingDocumentVerificationRequestController(
    req: Request,
    res: Response,
  ) {
    try {
      const validated_param =
        getArtisanPendingDocumentVerificationRequest_RequestParamValidation.parse(
          req.params,
        );

      const { artisan_id } = validated_param;

      const service_data =
        await this.adminService.getArtisanPendingDocumentVerificationRequestService(
          {
            artisan_id,
          },
        );

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

  async getAllBookingsController(req: Request, res: Response) {
    try {
      const validated_query = getAllBookings_RequestQueryValidation.parse(
        req.query,
      );

      const { status, days, limit, page, q } = validated_query;

      const service_data = await this.adminService.getAllBookingsService({
        limit,
        no_of_days: days,
        page,
        search_term: q,
        status,
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

  async getAllBookingsStatCardController(req: Request, res: Response) {
    try {
      const service_data =
        await this.adminService.getAllBookingsStatCardService();

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

  async getAllReviewsController(req: Request, res: Response) {
    try {
      const validated_query = getAllReviews_RequestQueryValidation.parse(
        req.query,
      );

      const { limit, page, q, reported_reviews } = validated_query;

      const service_data = this.adminService.getAllReviewsService({
        limit,
        page,
        reported_reviews,
        search_term: q,
      });

      const success_response = SuccessResponseStructure(service_data);

      return res.json(200).json(success_response);
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

  async getEarningsOverviewCardsController(req: Request, res: Response) {
    try {
      const service_data =
        await this.adminService.getEarningsOverviewCardsService();

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

  async getAllTransactionLogsController(req: Request, res: Response) {
    try {
      const validated_query =
        getAllTransactionLogs_RequestQueryValidation.parse(req.query);

      const { limit, page, q } = validated_query;

      const service_data = this.adminService.getAllTransactionLogsService({
        limit,
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

  async getRevenueTrendController(req: Request, res: Response) {
    try {
      const validated_query = getRevenueTrend_RequestQueryValidation.parse(
        req.query,
      );

      const { days } = validated_query;

      const service_data = this.adminService.getRevenueTrendService({ days });

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

  async getPlatformSettingsController(req: Request, res: Response) {
    try {
      const service_data = await this.adminService.getPlatformSettingsService();

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

  async updatePlatformSettingsController(req: Request, res: Response) {
    try {
      const validated_body = updatePlatformSettings_RequestBodyValidation.parse(
        req.body,
      );

      const { logo_url, maintenance_mode, platform_name, support_email } =
        validated_body;

      const service_data = this.adminService.updatePlatformSettingsService({
        maintenance_mode: maintenance_mode,
        new_platform_logo_url: logo_url,
        new_platform_name: platform_name,
        new_support_email_address: support_email,
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
}
