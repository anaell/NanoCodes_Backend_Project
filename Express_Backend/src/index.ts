import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from "cors";
import type { Request, Response } from 'express';
import dashboardRouter from './routes/user.ts';
import { artisanFavourite } from './routes/artisanFavourite.ts';
import { ArtisanRoute } from './routes/artisanRoute.ts';


const app = express();
app.use(express.json());
app.use(cors())

app.use("/", dashboardRouter);
app.use("/", artisanFavourite);
app.use('/', ArtisanRoute);



app.listen(process.env.PORT , () => {
    console.log(`server is runing on http://localhost:${process.env.PORT}`)
    console.log(process.env.PORT)
});

app.get("/",(req: Request, res: Response) => {
    res.send("Your Project Backend Server is Running Now")
})





