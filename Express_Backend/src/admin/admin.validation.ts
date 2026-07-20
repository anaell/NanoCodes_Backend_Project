import z from "zod";

export const getPlatformStatsController_RequestQueryValidation = z.object({
  days: z.coerce
    .number({ error: '"days" query param must be a number' })
    .positive('"days" must be greater than 0')
    .optional(),
});

export const getPlatformUsersController_RequestValidation = z.object({
  role: z
    .enum(["artisan", "user"], {
      error: 'Role must be either "artisan" or "user"',
    })
    .optional(),
  status: z.boolean({ error: "Status must be boolean" }).optional(),
  artisan_document_verification_status: z
    .enum(["pending", "accepted", "rejected", "more_info_required"], {
      error:
        'Allowed values for the "artisan_document_verification_status" query param are "pending", "accepted", "rejected", "more_info_required"',
    })
    .optional(),
  q: z.string({ error: '"q" must be a string' }).optional(),
  page: z.coerce
    .number({ error: '"page" query param must be a number' })
    .positive("Page number must be greater than 0")
    .optional(),
  limit: z.coerce
    .number({ error: '"limit" query param must be a number' })
    .positive({ error: '"limit" must be greater than zero' })
    .optional(),
});

export const deletePlatformUser_RequestValidation = z.object({
  user_id: z.uuidv7({ error: "user_id is missing" }),
});

export const reviewArtisanDocumentVerificationRequest_RequestBodyValidation =
  z.object({
    application_status_chosen: z.enum(
      ["accepted", "rejected", "more_info_required"],
      {
        error:
          '"application_status_chosen" value must be "accepted", "rejected" or "more_info_required" ',
      },
    ),
  });

export const reviewArtisanDocumentVerificationRequest_RequestParamValidation =
  z.object({
    artisan_id: z.uuidv7(),
  });

export const getArtisanPendingDocumentVerificationRequest_RequestParamValidation =
  z.object({
    artisan_id: z.uuidv7(),
  });

export const getAllBookings_RequestQueryValidation = z.object({
  q: z.string({ error: '"q" must be a string' }).optional(),
  status: z.enum(
    [
      "pending",
      "accepted",
      "rejected",
      "in_progress",
      "cancelled",
      "completed",
    ],
    {
      error:
        'Allowed values for the "status" query param are "pending", "accepted", "rejected", "in_progress", "cancelled", or "completed"',
    },
  ),
  days: z.coerce
    .number({ error: '"days" query param must be a number' })
    .positive('"days" must be greater than 0')
    .optional(),
  page: z.coerce
    .number({ error: "page query param must be a number" })
    .positive({ error: 'Value of "page" must be a positive number' })
    .optional(),
  limit: z.coerce
    .number({ error: "limit query param must be a number" })
    .positive({ error: 'Value of "limit" must be a positive number' })
    .optional(),
});

export const getAllReviews_RequestQueryValidation = z.object({
  q: z.string({ error: '"q" must be a string' }).optional(),
  reported_reviews: z.coerce
    .boolean({ error: '"reported_reviews" must be boolean, true or false' })
    .optional(),
  page: z.coerce
    .number({ error: "page query param must be a number" })
    .positive({ error: 'Value of "page" must be a positive number' })
    .optional(),
  limit: z.coerce
    .number({ error: "limit query param must be a number" })
    .positive({ error: 'Value of "limit" must be a positive number' })
    .optional(),
});

export const getAllTransactionLogs_RequestQueryValidation = z.object({
  q: z.string({ error: '"q" must be a string' }).optional(),
  page: z.coerce
    .number({ error: "page query param must be a number" })
    .positive({ error: 'Value of "page" must be a positive number' })
    .optional(),
  limit: z.coerce
    .number({ error: "limit query param must be a number" })
    .positive({ error: 'Value of "limit" must be a positive number' })
    .optional(),
});

export const getRevenueTrend_RequestQueryValidation = z.object({
  days: z.coerce
    .number({ error: '"days" query param must be a number' })
    .positive('"days" must be greater than 0')
    .optional(),
});

export const updatePlatformSettings_RequestBodyValidation = z.object({
  platform_name: z.string({ error: "platform name is missing" }),
  support_email: z.email({
    error: "support email is missing or an invalid email address",
  }),
  maintenance_mode: z.boolean({ error: "maintenance mode must be boolean" }),
  logo_url: z.url({ error: "please put a valid url for the logo" }),
});
