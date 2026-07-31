import z from "zod";

export const getArtisanByIdController_RequestParamValidation = z.object({
  artisan_id: z.uuidv7({
    error: "artisan_id is missing or invalid. It must be a uuidv7 string",
  }),
});

export const getArtisanCompletedBookingsController_RequestParamValidation =
  z.object({
    artisan_id: z.uuidv7({
      error: "artisan_id is missing or invalid. It must be a uuidv7 string",
    }),
  });

export const getArtisanCompletedBookingsController_RequestQueryValidation =
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

export const getArtisanReviewsController_RequestParamValidation = z.object({
  artisan_id: z.uuidv7({
    error: "artisan_id is missing or invalid. It must be a uuidv7 string",
  }),
});

export const getArtisanReviewsController_RequestQueryValidation = z.object({
  page: z.coerce
    .number({ error: "page query param must be a number" })
    .positive({ error: 'Value of "page" must be a positive number' })
    .optional(),
  limit: z.coerce
    .number({ error: "limit query param must be a number" })
    .positive({ error: 'Value of "limit" must be a positive number' })
    .optional(),
});

export const getArtisansController_RequestQueryValidation = z.object({
  q: z.string({ error: '"q" must be a string' }).optional(),
  location: z.string({ error: "location must be a string" }).optional(),
  page: z.coerce
    .number({ error: "page query param must be a number" })
    .positive({ error: 'Value of "page" must be a positive number' })
    .optional(),
  limit: z.coerce
    .number({ error: "limit query param must be a number" })
    .positive({ error: 'Value of "limit" must be a positive number' })
    .optional(),
  experience: z.coerce
    .number({ error: "experience query param must be a number" })
    .positive({ error: 'Value of "experience" must be a positive number' })
    .optional(),
  min_rating: z.coerce
    .number({ error: "min_rating query param must be a number" })
    .positive({ error: 'Value of "min_rating" must be a positive number' })
    .optional(),
});
