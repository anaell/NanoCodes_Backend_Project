import { Router } from "express";
import { PublicArtisanRepository } from "./artisan_public.repository.js";
import { PublicArtisanService } from "./artisan_public.service.js";
import { PublicArtisanController } from "./artisan_public.controller.js";

const publicArtisanRepository = new PublicArtisanRepository();
const publicArtisanService = new PublicArtisanService(publicArtisanRepository);
const publicArtisanController = new PublicArtisanController(
  publicArtisanService,
);

const route: Router = Router();

route.get(
  "/artisans/featured",
  publicArtisanController.getFeaturedArtisansController.bind(
    publicArtisanController,
  ),
);

route.get(
  "/artisans/:artisan_id",
  publicArtisanController.getArtisanByIdController.bind(
    publicArtisanController,
  ),
);

route.get(
  "/artisans/:artisan_id/bookings_completed",
  publicArtisanController.getArtisanCompletedBookingsController.bind(
    publicArtisanController,
  ),
);

route.get(
  "/artisans/:artisan_id/reviews",
  publicArtisanController.getArtisanReviewsController.bind(
    publicArtisanController,
  ),
);

route.get(
  "/artisans",
  publicArtisanController.getArtisansController.bind(publicArtisanController),
);

export default route;
