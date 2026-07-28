import z from "zod";

export const getArtisanByIdController_RequestParamValidation = z.object({
  artisan_id: z.uuidv7({
    error: "artisan_id is missing or invalid. It must be a uuidv7 string",
  }),
});

export const getArtisanIncomingJobRequestsController_RequestParamValidation =
  z.object({
    artisan_id: z.uuidv7({
      error: "artisan_id is missing or invalid. It must be a uuidv7 string",
    }),
  });
