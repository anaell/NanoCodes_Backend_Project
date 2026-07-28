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
