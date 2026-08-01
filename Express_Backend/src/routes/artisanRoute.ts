import { Router } from "express";
import {getArtisanBookingInfo} from '../controllers/artisanController.ts'


export const ArtisanRoute = Router();
ArtisanRoute.get("/user/:id/booking?artisan", getArtisanBookingInfo)