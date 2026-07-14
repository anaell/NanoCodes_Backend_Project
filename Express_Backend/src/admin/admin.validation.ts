import z from "zod";

export const getPlatformStatsController_RequestValidation = z.object({
  days: z.coerce
    .number({ error: '"days" query param must be a number' })
    .positive("Number of days must be greater than 0")
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
        'Allowed values for the artisan verification progress param are "pending", "accepted", "rejected", "more_info_required"',
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
          'application_status_chosen value must be "accepted", "rejected" or "more_info_required" ',
      },
    ),
  });

export const reviewArtisanDocumentVerificationRequest_RequestParamValidation =
  z.object({
    artisan_id: z.uuidv7(),
  });
