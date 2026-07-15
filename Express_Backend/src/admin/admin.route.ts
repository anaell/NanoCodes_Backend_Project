import { Router } from "express";
import { AdminController } from "./admin.controller.js";
import { AdminService } from "./admin.service.js";
import { AdminRepository } from "./admin.repository.js";

const route = Router();
const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

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
