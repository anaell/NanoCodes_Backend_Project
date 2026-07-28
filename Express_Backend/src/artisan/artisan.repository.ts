import { prisma } from "../lib/prisma.js";
import type {
  artisanBookingRequestResponse_InputType,
  getArtisanById_InputType,
  getArtisanIncomingJobRequests_InputType,
} from "./artisan.types.js";

export class ArtisanRepository {
  async getArtisanById({ artisan_id }: getArtisanById_InputType) {
    try {
      const today = new Date();
      const past_30_days = new Date();
      past_30_days.setDate(past_30_days.getDate() - 30);

      const [
        some_artisan_details,
        artisan_upcoming_jobs_accepted,
        artisan_total_pending_bookings,
        artisan_total_completed_bookings,
        artisan_earnings_overview,
      ] = await prisma.$transaction([
        prisma.artisan.findUniqueOrThrow({
          where: { id: artisan_id, user: { is_deleted: false } },
          select: {
            user: { select: { profile_pic_url: true } },
            rating: true,
          },
        }),
        prisma.booking.findMany({
          where: { artisan_id, booking_start_date: { gte: today } },
          select: {
            work_to_be_done: true,
            booking_start_date: true,
            booking_end_date: true,
            booking_address: true,
            customer: { select: { f_name: true, l_name: true } },
          },
        }),

        prisma.booking.count({
          where: { artisan_id, status: "pending" },
        }),
        prisma.booking.count({
          where: { artisan_id, status: "completed" },
        }),
        prisma.payment.aggregate({
          where: {
            status: "successful",
            artisan_id,
            payment_completed_at: { lte: past_30_days },
          },
          _sum: { amount: true },
        }),
      ]);

      const data = {
        artisan_details: some_artisan_details,
        artisan_upcoming_jobs_accepted,
        artisan_total_pending_bookings,
        artisan_total_completed_bookings,
        artisan_earnings_overview,
      };

      return data;
    } catch (error) {
      // Successfully passes the error up to the service/controller layer
      throw error;
    }
  }

  async getArtisanIncomingBookingRequests({
    artisan_id,
  }: getArtisanIncomingJobRequests_InputType) {
    try {
      const [
        total_artisan_incoming_booking_requests,
        artisan_incoming_booking_requests,
      ] = await prisma.$transaction([
        prisma.booking.count({ where: { artisan_id, status: "pending" } }),
        prisma.booking.findMany({
          where: { artisan_id, status: "pending" },
          select: {
            status: true,
            artisan: {
              select: { user: { select: { profile_pic_url: true } } },
            },
            customer: { select: { profile_pic_url: true } },
            created_at: true,
            booking_address: true,
            work_to_be_done: true,
            problem_description: true,
          },
        }),
      ]);

      const data = {
        total_requests: total_artisan_incoming_booking_requests,
        artisan_incoming_booking_requests_info:
          artisan_incoming_booking_requests,
      };

      return data;
    } catch (error) {
      // Successfully passes the error up to the service/controller layer
      throw error;
    }
  }

  async artisanBookingRequestResponse({
    artisan_id,
    booking_id,
    artisan_booking_response,
  }: artisanBookingRequestResponse_InputType) {
    try {
      const apply_artisan_booking_response = await prisma.booking.update({
        where: { id: booking_id, artisan_id, status: "pending" },
        data: { status: artisan_booking_response },
        select: {
          status: true,
          artisan: {
            select: { user: { select: { profile_pic_url: true } } },
          },
          customer: { select: { profile_pic_url: true } },
          created_at: true,
          booking_address: true,
          work_to_be_done: true,
          problem_description: true,
        },
      });

      return apply_artisan_booking_response;
    } catch (error) {
      // Successfully passes the error up to the service/controller layer
      throw error;
    }
  }

  async next() {
    try {
    } catch (error) {
      // Successfully passes the error up to the service/controller layer
      throw error;
    }
  }
}
