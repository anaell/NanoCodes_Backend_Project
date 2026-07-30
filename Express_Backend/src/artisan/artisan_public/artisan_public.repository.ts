import { prisma } from "../../lib/prisma.js";
import type {
  getArtisanById_InputType,
  getArtisanCompletedBookings_InputType,
  getArtisanReviews_InputType,
} from "./artisan_public.types.js";

export class PublicArtisanRepository {
  async getFeaturedArtisans() {
    try {
      const featured_artisan = await prisma.artisan.findMany({
        where: {
          user: { is_deleted: false, is_suspended: false },
          rating: { gte: 4.7 },
        },
        orderBy: { rating: "desc" },
        take: 5,
        select: {
          user: {
            select: { profile_pic_url: true, f_name: true, l_name: true },
          },
          location: true,
          main_skill: true,
          rating: true,
        },
      });

      return { featured_artisan };
    } catch (error) {
      // Successfully passes the error up to the service/controller layer
      throw error;
    }
  }

  async getArtisanById({ artisan_id }: getArtisanById_InputType) {
    try {
      const artisan = await prisma.artisan.findUniqueOrThrow({
        where: {
          id: artisan_id,
          user: { is_deleted: false, is_suspended: false },
        },
        select: {
          user: { select: { f_name: true, l_name: true } },
          experience: true,
          location: true,
          verified: true,
          about_artisan: true,
          response_time: true,
          rating: true,
          main_skill: true,
          skills: true,
          services: true,
          reviews: {
            where: { status: { not: "deleted" } },
            take: 3,
            select: {
              created_at: true,
              comment: true,
              rating: true,
              customer: {
                select: { f_name: true, l_name: true, profile_pic_url: true },
              },
            },
          },
          id: true,
          bookings: {
            where: { status: "completed" },
            take: 4,
            orderBy: { updated_at: "desc" },
            select: {
              id: true,
              booking_related_pictures: { select: { url: true } },
            },
          },
        },
      });

      return { artisan };
    } catch (error) {
      // Successfully passes the error up to the service/controller layer
      throw error;
    }
  }

  async getArtisanCompletedBookings({
    artisan_id,
    limit = 10,
    page = 1,
  }: getArtisanCompletedBookings_InputType) {
    try {
      const number_to_skip = (page - 1) * limit;

      const [total_artisan_completed_bookings, artisan_completed_bookings] =
        await prisma.$transaction([
          prisma.booking.count({
            where: {
              artisan_id,
              status: "completed",
              artisan: { user: { is_deleted: false, is_suspended: false } },
            },
          }),
          prisma.booking.findMany({
            where: {
              artisan_id,
              status: "completed",
              artisan: { user: { is_deleted: false, is_suspended: false } },
            },
            take: limit,
            skip: number_to_skip,
            orderBy: { updated_at: "desc" },
            select: {
              id: true,
              booking_related_pictures: { select: { url: true } },
            },
          }),
        ]);

      const totalPages = Math.ceil(total_artisan_completed_bookings / limit);

      const data = {
        artisan_completed_bookings,
        total_artisan_completed_bookings,
        meta: {
          total_artisan_completed_bookings,
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

  async getArtisanReviews({
    artisan_id,
    limit = 10,
    page = 1,
  }: getArtisanReviews_InputType) {
    try {
      const number_to_skip = (page - 1) * limit;

      const [total_artisan_reviews, artisan_reviews] =
        await prisma.$transaction([
          prisma.booking_Review.count({
            where: {
              artisanId: artisan_id,
              status: { not: "deleted" },
              artisan: { user: { is_deleted: false, is_suspended: false } },
            },
          }),
          prisma.booking_Review.findMany({
            where: {
              artisanId: artisan_id,
              status: { not: "deleted" },
              artisan: { user: { is_deleted: false, is_suspended: false } },
            },
            take: limit,
            skip: number_to_skip,
            orderBy: { created_at: "desc" },
            select: {
              created_at: true,
              comment: true,
              rating: true,
              customer: {
                select: { f_name: true, l_name: true, profile_pic_url: true },
              },
              reply: { select: { created_at: true, reply: true } },
            },
          }),
        ]);

      const totalPages = Math.ceil(total_artisan_reviews / limit);

      const data = {
        artisan_reviews,
        total_artisan_reviews,
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

  async next() {
    try {
    } catch (error) {
      // Successfully passes the error up to the service/controller layer
      throw error;
    }
  }
}
