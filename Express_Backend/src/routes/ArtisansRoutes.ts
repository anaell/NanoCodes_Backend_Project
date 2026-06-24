import express from 'express'
import { CreateArtisan } from '../controllers/Artisanscontrollers.js';

export const  ArtisansRouts = express.Router();

ArtisansRouts.post("/api/Artisans", CreateArtisan)