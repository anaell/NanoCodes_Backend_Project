import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.ts";

const getArtisanBookingInfo = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        const artisanId = req.query.artisan as string;

        if (!artisanId) {
            return res.status(400).json({ 
                status: 'failed',
                message: "artisan query parameter is required" 
            });
        }

        
        const artisan = await prisma.artisan.findUnique({
            where: {user_id: userId},
                include: {
                    User: {
                        select: {
                            f_name: true,
                            l_name: true,
                            profile_pic_url: true,
                            preferred_booking_address: true
                        }
                    },
                    Artisan_Skill: true,
                    
                    Service: true,
                    Booking: {
                        select: { id: true},
                    },
                    Booking_Review: {
                        select: { rating: true }
                }
            },
            
        })

        if (!artisan) {
            return res.status(404).json({ 
                status: 'failed',
                message: "Artisan not found" 
            });
        }

        
        const reviewsCount = artisan.Booking.length;
        const rating = reviewsCount > 0
            ? artisan.Booking_Review.reduce((sum, r) => sum + r.rating, 0) / reviewsCount
            : 0;
        const totalBookings = artisan.Booking.length;

        res.json({
            status: 'success',
            data: {
                fullName: artisan.User.f_name,
                lastName: artisan.User.l_name,
                profilepicture: artisan.User.profile_pic_url,
                location: artisan.User.preferred_booking_address,
                skill: artisan.Artisan_Skill,
                reviewsCount,
                rating,
                totalBookings
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: "failed",
            message: "Server error" 
        });
    }
};

export {getArtisanBookingInfo}