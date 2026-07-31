import { getArtisans } from "../controllers/Allartisans.ts";
import express from 'express';

export const AllartisanRout = express.Router();

AllartisanRout.get(
    "/api/Allartisans",
    getArtisans
)