import { Router } from "express";
import { ArtisanRepository } from "./artisan.repository.js";
import { ArtisanController } from "./artisan.controller.js";
import { ArtisanService } from "./artisan.service.js";

const artisanRepository = new ArtisanRepository();
const artisanService = new ArtisanService(artisanRepository);
const artisanController = new ArtisanController(artisanService);

const route: Router = Router();

route.get(
  "/artisan/:artisan_id",
  artisanController.getArtisanByIdController.bind(artisanController),
);

export default route;
