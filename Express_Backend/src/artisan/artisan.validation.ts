import z from "zod";

export const getArtisanByIdController_RequestParamValidation = z.object({
  artisan_id: z.uuidv7({
    error: "artisan_id is missing or invalid. It must be a uuidv7 string",
  }),
});

export const getArtisanIncomingBookingRequestsController_RequestParamValidation =
  z.object({
    artisan_id: z.uuidv7({
      error: "artisan_id is missing or invalid. It must be a uuidv7 string",
    }),
  });

export const artisanBookingRequestResponseController_RequestParamValidation =
  z.object({
    artisan_id: z.uuidv7({
      error: "artisan_id is missing or invalid. It must be a uuidv7 string",
    }),
    booking_id: z.uuidv7({
      error: "booking_id is missing or invalid. It must be a uuidv7 string",
    }),
  });

export const artisanBookingRequestResponseController_RequestBodyValidation =
  z.object({
    artisan_response: z.enum(["accepted", "rejected"], {
      error:
        'Allowed values for the "artisan_response" are "accepted" or "rejected"',
    }),
  });

export const getArtisanBookingHistoryController_RequestParamValidation =
  z.object({
    artisan_id: z.uuidv7({
      error: "artisan_id is missing or invalid. It must be a uuidv7 string",
    }),
  });

export const getArtisanBookingHistoryController_RequestQueryValidation =
  z.object({
    days: z.coerce
      .number({ error: '"days" query param must be a number' })
      .positive('"days" must be greater than 0')
      .optional(),
    booking_status: z.enum(
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
          'Allowed values for the "booking_status" query param are "pending", "accepted", "rejected", "in_progress", "cancelled", or "completed"',
      },
    ),
    page: z.coerce
      .number({ error: "page query param must be a number" })
      .positive({ error: 'Value of "page" must be a positive number' })
      .optional(),
    limit: z.coerce
      .number({ error: "limit query param must be a number" })
      .positive({ error: 'Value of "limit" must be a positive number' })
      .optional(),
  });

export const getArtisanReviewsAndRatingController_RequestParamValidation =
  z.object({
    artisan_id: z.uuidv7({
      error: "artisan_id is missing or invalid. It must be a uuidv7 string",
    }),
  });

export const getArtisanReviewsAndRatingController_RequestQueryValidation =
  z.object({
    page: z.coerce
      .number({ error: "page query param must be a number" })
      .positive({ error: 'Value of "page" must be a positive number' })
      .optional(),
    limit: z.coerce
      .number({ error: "limit query param must be a number" })
      .positive({ error: 'Value of "limit" must be a positive number' })
      .optional(),
  });

export const getArtisanReviewAndRatingStatsController_RequestParamValidation =
  z.object({
    artisan_id: z.uuidv7({
      error: "artisan_id is missing or invalid. It must be a uuidv7 string",
    }),
  });

export const createOrUpdateArtisanReplyToReviewController_RequestParamValidation =
  z.object({
    artisan_id: z.uuidv7({
      error: "artisan_id is missing or invalid. It must be a uuidv7 string",
    }),
    review_id: z.uuidv7({
      error: "review_id is missing or invalid. It must be a uuidv7 string",
    }),
  });

export const createOrUpdateArtisanReplyToReviewController_RequestBodyValidation =
  z.object({
    reply: z.string({
      error: "artisan reply is missing from the request body",
    }),
  });
