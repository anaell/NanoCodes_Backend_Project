import { Router } from "express";
import { AdminController } from "./admin.controller.js";
import { AdminService } from "./admin.service.js";
import { AdminRepository } from "./admin.repository.js";
import { AdminAuthRepository } from "./admin_auth/admin_auth.repository.js";
import { AdminAuthService } from "./admin_auth/admin_auth.service.js";
import { AdminAuthController } from "./admin_auth/admin_auth.controller.js";

const route: Router = Router();
const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

const adminAuthRepository = new AdminAuthRepository();
const adminAuthService = new AdminAuthService(adminAuthRepository);
const adminAuthController = new AdminAuthController(adminAuthService);

route.get(
  "/admin/analytics",
  adminController.getPlatformStatsController.bind(adminController),
);

route.get(
  "/admin/users",
  adminController.getPlatformUsersController.bind(adminController),
);

route.delete(
  ".admin/users/:user_id",
  adminController.deletePlatformUserController.bind(adminController),
);

route.get(
  "/admin/artisans/pending_document_verification",
  adminController.getAllArtisansWithPendingDocumentVerificationRequestController.bind(
    adminController,
  ),
);

route.get(
  "/admin/artisans/pending_document_verification/:artisan_id",
  adminController.getArtisanPendingDocumentVerificationRequestController.bind(
    adminController,
  ),
);

route.post(
  "/admin/artisans/pending_document_verification/:artisan_id",
  adminController.reviewArtisanDocumentVerificationRequestController.bind(
    adminController,
  ),
);

route.get(
  "/admin/bookings",
  adminController.getAllBookingsController.bind(adminController),
);

route.get(
  "/admin/bookings/stat_card",
  adminController.getAllBookingsStatCardController.bind(adminController),
);

route.get(
  "/admin/reviews",
  adminController.getAllReviewsController.bind(adminController),
);

route.get(
  "/admin/earnings_management/stats_card",
  adminController.getEarningsOverviewCardsController.bind(adminController),
);

route.get(
  "/admin/earnings_management/transaction_logs",
  adminController.getAllTransactionLogsController.bind(adminController),
);

route.get(
  "/admin/earnings_management/revenue_trend",
  adminController.getRevenueTrendController.bind(adminController),
);

route.get(
  "/admin/system_settings",
  adminController.getPlatformSettingsController.bind(adminController),
);

route.post(
  "/admin/system_settings",
  adminController.updatePlatformSettingsController.bind(adminController),
);

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
