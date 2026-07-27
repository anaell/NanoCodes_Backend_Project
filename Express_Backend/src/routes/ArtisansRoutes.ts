import { Router } from "express";
import { CreateArtisan } from "../controllers/Artisanscontrollers.js";

export const ArtisansRouts: Router = Router();

ArtisansRouts.post("/api/Artisans", CreateArtisan);
