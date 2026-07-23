import z from "zod";

export const LoginController_RequestBodyValidator = z.object({
  email: z.email({ error: "email field is missing or invalid" }),
  password: z.string({ error: "password is required" }),
});

export const SignupController_RequestBodyValidator = z.object({
  email: z.email({ error: "email field is missing or invalid" }),
  password: z
    .string({ error: "password is required" })
    .min(8, { error: "password must be at least 8 characters in length" }),
  name: z.string({ error: "name field is missing" }),
});
