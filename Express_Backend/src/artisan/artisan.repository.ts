import { prisma } from "../lib/prisma.js";
import type {
  artisanBookingRequestResponse_InputType,
  createOrUpdateArtisanReplyToReview_InputType,
  getArtisanBookingHistory_InputType,
  getArtisanBookingHistory_WhereType,
  getArtisanById_InputType,
  getArtisanIncomingJobRequests_InputType,
  getArtisanReviewAndRatingStats_InputType,
  getArtisanReviewsAndRating_InputType,
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

  async getArtisanBookingHistory({
    artisan_id,
    booking_status,
    no_of_days,
    page = 1,
    limit = 10,
  }: getArtisanBookingHistory_InputType) {
    try {
      const whereBase: getArtisanBookingHistory_WhereType = { artisan_id };

      if (booking_status) {
        whereBase.status = booking_status;
      }

      // 1. Initialize an empty filter object
      const dateFilter: { gte?: Date } = {};

      // 2. Only apply the filter if the user explicitly provided a number of days
      if (no_of_days !== undefined && no_of_days !== null) {
        const date_range = new Date();
        date_range.setDate(date_range.getDate() - no_of_days);
        dateFilter.gte = date_range;

        whereBase.created_at = dateFilter;
      }

      const number_to_skip = (page - 1) * limit;

      const [total_artisan_bookings, artisan_bookings] =
        await prisma.$transaction([
          prisma.booking.count({ where: whereBase }),
          prisma.booking.findMany({
            where: whereBase,
            take: limit,
            skip: number_to_skip,
            orderBy: { created_at: "desc" },
            select: {
              id: true,
              customer: {
                select: { profile_pic_url: true, l_name: true, f_name: true },
              },
              status: true,
              booking_price: true,
              work_to_be_done: true,
            },
          }),
        ]);

      const totalPages = Math.ceil(total_artisan_bookings / limit);

      const data = {
        total_artisan_bookings,
        artisan_bookings,
        meta: {
          total_artisan_bookings,
          current_page: page,
          per_page: limit,
          total_pages: totalPages,
          has_next_page: page < totalPages,
          has_previous_page: page > 1,
        },
      };

      return data;
    } catch (error) {
      // Successfully passes the error up to the service/controller layer
      throw error;
    }
  }

  async getArtisanReviewsAndRating({
    artisan_id,
    page = 1,
    limit = 10,
  }: getArtisanReviewsAndRating_InputType) {
    try {
      const number_to_skip: number = (page - 1) * limit;

      const [total_artisan_reviews, artisan_reviews] =
        await prisma.$transaction([
          prisma.booking_Review.count({
            where: {
              artisanId: artisan_id,
              OR: [{ status: "published" }, { status: "reported" }],
              booking: { status: "completed" },
            },
          }),
          prisma.booking_Review.findMany({
            where: {
              artisanId: artisan_id,
              OR: [{ status: "published" }, { status: "reported" }],
              booking: { status: "completed" },
            },
            skip: number_to_skip,
            take: limit,
            orderBy: { created_at: "desc" },
            select: {
              id: true,
              customer: { select: { f_name: true, l_name: true } },
              booking: { select: { work_to_be_done: true } },
              status: true,
              rating: true,
              comment: true,
              created_at: true,
              reply: { select: { created_at: true, id: true, reply: true } },
            },
          }),
        ]);

      const totalPages = Math.ceil(total_artisan_reviews / limit);

      const data = {
        artisan_reviews,
        meta: {
          total_artisan_reviews,
          current_page: page,
          per_page: limit,
          total_pages: totalPages,
          has_next_page: page < totalPages,
          has_previous_page: page > 1,
        },
      };

      return data;
    } catch (error) {
      // Successfully passes the error up to the service/controller layer
      throw error;
    }
  }

  async getArtisanReviewAndRatingStats({
    artisan_id,
  }: getArtisanReviewAndRatingStats_InputType) {
    try {
      const [
        total_artisan_reviews,
        overall_artisan_rating,
        artisan_rating_breakdown,
        artisan_profile_pic_url,
      ] = await prisma.$transaction([
        prisma.booking_Review.count({
          where: {
            artisanId: artisan_id,
            OR: [{ status: "published" }, { status: "reported" }],
            booking: { status: "completed" },
          },
        }),
        prisma.booking_Review.aggregate({
          where: {
            artisanId: artisan_id,
            OR: [{ status: "published" }, { status: "reported" }],
            booking: { status: "completed" },
          },
          _avg: { rating: true },
        }),
        prisma.booking_Review.groupBy({
          where: {
            artisanId: artisan_id,
            OR: [{ status: "published" }, { status: "reported" }],
            booking: { status: "completed" },
          },
          by: "rating",
          _count: { rating: true },
        }),
        prisma.artisan.findUniqueOrThrow({
          where: { id: artisan_id },
          select: { user: { select: { profile_pic_url: true } } },
        }),
      ]);

      const [total_artisan_bookings, artisan_completed_bookings] =
        await prisma.$transaction([
          prisma.booking.count({ where: { artisan_id } }),
          prisma.booking.count({
            where: { artisan_id, status: "completed" },
          }),
        ]);

      const data = {
        total_artisan_reviews,
        overall_artisan_rating,
        artisan_rating_breakdown,
        artisan_profile_pic_url,
        total_artisan_bookings,
        artisan_completed_bookings,
      };

      return data;
    } catch (error) {
      // Successfully passes the error up to the service/controller layer
      throw error;
    }
  }

  async createOrUpdateArtisanReplyToReview({
    artisan_id,
    reply,
    review_id,
  }: createOrUpdateArtisanReplyToReview_InputType) {
    try {
      // 1. Fetch the target review to verify existence and ownership
      const targetReview = await prisma.booking_Review.findUnique({
        where: { id: review_id },
        select: { artisanId: true }, // Only select what we need for efficiency
      });

      // 2. If the review doesn't exist, block the request
      if (!targetReview) {
        throw new Error(
          "The review you are trying to reply to does not exist.",
        );
      }

      // 3. Security Boundary: Ensure the requesting artisan owns this review
      if (targetReview.artisanId !== artisan_id) {
        throw new Error(
          "Unauthorized: You cannot reply to another artisan's review.",
        );
      }

      // 4. Safe to proceed: Perform the atomic upsert
      const artisan_review_reply = await prisma.artisan_Review_Reply.upsert({
        where: { review_id },
        create: { reply, review_id },
        update: { reply },
      });

      return { artisan_review_reply };
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
