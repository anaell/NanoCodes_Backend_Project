import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.ts";


    const getArtisans = async (req:Request, res:Response) => {

        try{
            const artisans = await prisma.artisan.findMany();

            return res.status(200).json({
                status: "success",
                message: "suceessful",
                data: artisans
            })
        }catch(err){
            console.log(err)
        }
    }

    export { getArtisans}