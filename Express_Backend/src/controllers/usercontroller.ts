import type { Request, Response } from "express";
import { prisma } from '../lib/prisma.ts'

const getUserDashboard = async (req: Request, res: Response) => {

    try{

        const userId =  req.params.id;

        if (!userId || Array.isArray(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
    
        const user = await prisma.user.findUnique({
            where: {id:  userId},
            select: {
                f_name: true,
                l_name: true,
                profile_pic_url: true,
                Booking: {
                    select: {
                        status: true,
                        booking_price: true,
                        work_to_be_done: true,
                        created_at: true
                    }
                }
            }
        });

        if(!user){
            return res.status(404).json({
                status: 'failed',
                message: 'user not found'
            });
        };

        const totalBookings = user.Booking.length;
        const activeBookings = user.Booking.filter(p => p.status === 'accepted').length;
        const completedBookings = user.Booking.filter(p => p.status === 'completed').length;
        const totalAmountSpent = user.Booking.filter(p => p.status === 'completed').reduce((sum,p) => sum + (p.booking_price ? Number(p.booking_price) : 0),0);
        const averagePerService = completedBookings > 0 ? totalAmountSpent / completedBookings : 0;
        const recentService = user.Booking.filter(p => p.status === 'completed').slice(-4).map(p => ({
            work_to_be_done: p.work_to_be_done,
            date: p.created_at
        }));

        res.json({
            status: "success",
            data: {
                fullName: user.f_name,
                lastName: user.l_name,
                profilePicture: user.profile_pic_url,
                totalBookings,
                activeBookings,
                completedBookings,
                averagePerService,
                recentService,
                totalAmountSpent
            }
        });
    }catch(err){
        return res.status(500).json({
            status: 'failed',
            message: "internal server Error"
        })
    }
};

export { getUserDashboard}
