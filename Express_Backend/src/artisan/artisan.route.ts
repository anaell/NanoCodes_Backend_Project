import { Router } from "express";
import { ArtisanRepository } from "./artisan.repository.js";
import { ArtisanController } from "./artisan.controller.js";
import { ArtisanService } from "./artisan.service.js";

const artisanRepository = new ArtisanRepository();
const artisanService = new ArtisanService(artisanRepository);
const artisanController = new ArtisanController(artisanService);

const route: Router = Router();

route.get(
  "/artisans/:artisan_id",
  artisanController.getArtisanByIdController.bind(artisanController),
);

route.get(
  "/artisans/:artisan_id/requests/incoming",
  artisanController.getArtisanIncomingBookingRequestsController.bind(
    artisanController,
  ),
);

route.patch(
  "/artisans/:artisan_id/requests/incoming/:booking_id",
  artisanController.artisanBookingRequestResponseController.bind(
    artisanController,
  ),
);

route.get(
  "/artisans/:artisan_id/job-history",
  artisanController.getArtisanBookingHistoryController.bind(artisanController),
);

route.get(
  "/artisans/:artisan_id/reviews",
  artisanController.getArtisanReviewsAndRatingController.bind(
    artisanController,
  ),
);

route.get(
  "/artisans/:artisan_id/reviews/stats",
  artisanController.getArtisanReviewAndRatingStatsController.bind(
    artisanController,
  ),
);

route.post(
  "/artisans/:artisan_id/reviews/:review_id/reply",
  artisanController.createOrUpdateArtisanReplyToReviewController.bind(
    artisanController,
  ),
);

route.get(
  "/artisans/:artisan_id/earnings/stats",
  artisanController.getArtisanEarningsStatsCardController.bind(
    artisanController,
  ),
);

route.get(
  "/artisans/:artisan_id/earnings/trend_chart",
  artisanController.getArtisanEarningsTrendDataController.bind(
    artisanController,
  ),
);

route.get(
  "/artisans/:artisan_id/transactions",
  artisanController.getArtisanTransactionsController.bind(artisanController),
);

export default route;
