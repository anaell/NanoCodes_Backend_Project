import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from "cors";
import type { Request, Response } from 'express';


const app = express();
app.use(express.json());
app.use(cors())

app.listen(process.env.PORT , () => {
    console.log(`server is runing on http://localhost:${process.env.PORT}`)
    console.log(process.env.PORT)
});

app.get("/",(req: Request, res: Response) => {
    res.send("Your Project Backend Server is Running Now")
})





