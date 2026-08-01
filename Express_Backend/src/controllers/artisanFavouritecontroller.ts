import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.ts";

const updateFavourites =  async (req: Request, res: Response) => {
    try{

        const userId = req.params.id as string

        const { artisanId, action} = req.body;

        if(!artisanId || !action){
            return res.status(400).json({
                status: 'failed',
                message: "must contain productid and action"
            });
        };

        if(action === 'add'){
            const favourites =  await prisma.favourite.create({
                data: {
                    user_id: userId,
                    artisan_id: artisanId
                }
            });

            res.status(201).json({
                status: 'success',
                message: 'artisan added to favourite',
                data: {
                    favourites
                }
            })
        }

        if(action === 'remove'){
            const favourite =  await prisma.favourite.deleteMany({
                where: {user_id: userId, artisan_id: artisanId}
            });

            res.status(200).json({
                status: 'success',
                message: 'artisan removed from favourites'
            });
        }

        res.status(400).json({
            status: 'failed',
            message: 'invalide action'
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            status: 'failed',
            message: "internal server Error"
        })
    }
}

const getFavourites = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;

        const favourites = await prisma.favourite.findMany({
        where: { user_id: userId },
        include: {
            Artisan: {
            select: {
                id: true,
                f_name: true,
                l_name: true,
                profile_pic_url: true,
                service_category: true,
            },
            },
        },
        });
        
        if(!favourites){
            return res.status(404).json({
                status: 'failed',
                message: 'favourites not found'
            })
        }

        const artisans = favourites.map(p => p.Artisan)

        res.status(200).json({
            status: 'success',
            data: {
                artisans
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
export{updateFavourites, getFavourites}