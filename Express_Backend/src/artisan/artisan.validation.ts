import z from "zod";

export const getArtisanByIdController_RequestParamValidation = z.object({
  artisan_id: z.uuidv7({ error: "artisan id is missing" }),
});
