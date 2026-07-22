import { Router } from "express";
import { AdminAuthService } from "./admin_auth.service.js";
import { AdminAuthRepository } from "./admin_auth.repository.js";
import { AdminAuthController } from "./admin_auth.controller.js";
const adminAuthRepository = new AdminAuthRepository();
const adminAuthService = new AdminAuthService(adminAuthRepository);
const adminAuthController = new AdminAuthController(adminAuthService);

const route: Router = Router();

route.post(
  "/admin/login",
  adminAuthController.LoginController.bind(adminAuthController),
);

route.post(
  "/admin/sign-up",
  adminAuthController.SignupController.bind(adminAuthController),
);

route.get(
  "/admin/logout",
  adminAuthController.LogoutController.bind(adminAuthController),
);

route.get(
  "/admin/refresh-token",
  adminAuthController.RefreshAccessTokenController.bind(adminAuthController),
);

export default route;
