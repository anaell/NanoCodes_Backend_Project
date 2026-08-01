import { Router } from "express";
import {getFavourites,updateFavourites} from '../controllers/artisanFavouritecontroller.ts'


export const artisanFavourite = Router()
artisanFavourite.post('/user/:id/favourite', updateFavourites);
artisanFavourite.get('/user/:id/favourite', getFavourites);