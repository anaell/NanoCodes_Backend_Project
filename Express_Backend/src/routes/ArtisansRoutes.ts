import express from 'express'
import { CreateArtisan } from '../controllers/Artisanscontrollers.ts';

export const  ArtisansRouts = express.Router();

ArtisansRouts.post("/api/Artisans", CreateArtisan)