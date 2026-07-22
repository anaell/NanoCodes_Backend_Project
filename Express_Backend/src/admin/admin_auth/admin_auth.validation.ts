import z from "zod";

export const LoginController_RequestBodyValidator = z.object({
  email: z.email({ error: "email field is missing or invalid" }),
  password: z.string({ error: "password is required" }),
});

export const SignupController_RequestBodyValidator = z.object({
  email: z.email({ error: "email field is missing or invalid" }),
  password: z.string({ error: "password is required" }),
  name: z.string({ error: "name field is missing" }),
});
