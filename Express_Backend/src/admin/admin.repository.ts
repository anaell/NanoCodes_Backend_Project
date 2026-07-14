import { prisma } from "../lib/prisma.js";
import type {
  delete_User_Artisan_Account_InputType,
  deletePlatformUser_InputType,
  getPlatformUsers_InputType,
  getPlatformUsers_WhereType,
  reviewArtisanDocumentVerificationRequest_InputType,
} from "./admin.types.js";

export class AdminRepository {
  async getPlatformStats(no_of_days?: number) {
    try {
      console.log(
        `getPlatformStats repository function has started execution \nTime: ${Date.now()}`,
      );

      // 1. Initialize an empty filter object
      const dateFilter: { gte?: Date } = {};

      // 2. Only apply the filter if the user explicitly provided a number of days
      if (no_of_days !== undefined && no_of_days !== null) {
        const date_range = new Date();
        date_range.setDate(date_range.getDate() - no_of_days);
        dateFilter.gte = date_range;
      }

      // 3. Build a dynamic where object to reuse across queries
      // If no_of_days wasn't provided, this object won't contain a created_at filter
      const baseWhereClause =
        Object.keys(dateFilter).length > 0
          ? { created_at: dateFilter, is_deleted: { not: false } }
          : { is_deleted: { not: false } };

      const [
        total_users,
        total_artisans,
        total_bookings,
        total_booking_reviews,
        average_review_rating,
        booking_status_number,
        user_platform_growth,
        artisan_platform_growth,
      ] = await prisma.$transaction([
        prisma.user.count({
          where: {
            role: { not: "admin" },
            ...baseWhereClause, // Dynamically injects created_at only if it exists
          },
        }),
        prisma.artisan.count({
          where: baseWhereClause,
        }),
        prisma.booking.count({
          where: baseWhereClause,
        }),
        prisma.booking_Review.count({
          where: baseWhereClause,
        }),
        prisma.booking_Review.aggregate({
          where: baseWhereClause,
          _avg: { rating: true },
        }),
        prisma.booking.groupBy({
          where: baseWhereClause,
          by: ["status"],
          _count: { status: true },
        }),
        prisma.user.groupBy({
          by: ["created_at"],
          where: {
            role: { not: "admin" }, // Keep admins out of growth stats too
            ...baseWhereClause,
          },
          _count: { created_at: true },
          orderBy: { created_at: "asc" },
        }),
        prisma.artisan.groupBy({
          by: ["created_at"],
          where: baseWhereClause,
          _count: { created_at: true },
          orderBy: { created_at: "asc" },
        }),
      ]);

      const data = {
        total_users,
        total_artisans,
        total_bookings,
        total_booking_reviews,
        average_review_rating: average_review_rating._avg.rating || 0, // Fallback to 0 if null
        booking_status_number,
        user_platform_growth,
        artisan_platform_growth,
      };

      console.log(
        `getPlatformStats repository completed successfully \nTime: ${Date.now()}`,
      );
      return data;
    } catch (error) {
      const error_message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(
        `getPlatformStats repository function Execution failed: ${error_message}`,
      );

      // Successfully passes the error up to the service/controller layer
      throw error;
    }
  }

  async getPlatformUsers({
    search_term,
    role,
    status,
    artisan_document_verification_status,
    page = 1, // Default to page 1
    limit = 10, // Default to 10 users per page
  }: getPlatformUsers_InputType) {
    try {
      console.log(
        `getPlatformUsers repository function started \nTime: ${Date.now()}`,
      );

      const baseWhere: getPlatformUsers_WhereType = { is_deleted: false };

      if (role) baseWhere.role = role;

      if (search_term) {
        baseWhere.OR = [
          { f_name: { contains: search_term, mode: "insensitive" } },
          { l_name: { contains: search_term, mode: "insensitive" } },
          { email: { contains: search_term, mode: "insensitive" } },
          { id: { contains: search_term, mode: "insensitive" } },
        ];
      }

      if (status !== undefined) {
        baseWhere.is_suspended = status;
        baseWhere.artisan = { verified: { equals: status } };
      }

      if (artisan_document_verification_status) {
        baseWhere.artisan = {
          ...baseWhere.artisan,
          artisanVerificationDocuments: {
            status: { equals: artisan_document_verification_status },
          },
        };
        // artisan: {
        //       artisanVerificationDocuments: { status: { equals: "accepted" } },
        //     }
      }

      // Calculate how many records to skip over
      const skipValue = (page - 1) * limit;

      // Run count and fetch concurrently
      const [totalItems, users] = await prisma.$transaction([
        prisma.user.count({ where: baseWhere }),
        prisma.user.findMany({
          where: baseWhere,
          take: limit, // Max items to return
          skip: skipValue, // Number of items to skip
          orderBy: { created_at: "desc" }, // Show newest signups first
          select: {
            id: true,
            f_name: true,
            l_name: true,
            role: true,
            created_at: true,
            email: true,
            profile_pic_url: true,
            is_suspended: true,
            artisan: { select: { created_at: true, verified: true } },
          },
        }),
      ]);

      // Calculate simple metadata totals
      const totalPages = Math.ceil(totalItems / limit);

      console.log(
        `getPlatformUsers repository completed \nTime: ${Date.now()}`,
      );

      return {
        users,
        meta: {
          total_items: totalItems,
          current_page: page,
          per_page: limit,
          total_pages: totalPages,
          has_next_page: page < totalPages,
          has_previous_page: page > 1,
        },
      };
    } catch (error) {
      const error_message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(
        `getPlatformUsers repository function Execution failed: ${error_message}`,
      );
      throw error;
    }
  }

  async deletePlatformUser({ user_id }: deletePlatformUser_InputType) {
    try {
      const delete_user = await prisma.user.update({
        where: { id: user_id, is_deleted: { not: true } },
        data: { is_deleted: true },
        select: {
          id: true,
          is_deleted: true,
          f_name: true,
          l_name: true,
          email: true,
        },
      });

      return delete_user;
    } catch (error) {
      const error_message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(
        `getPlatformUsers repository function Execution failed: ${error_message}`,
      );
      throw error;
    }
  }

  async reviewArtisanDocumentVerificationRequest({
    artisan_id,
    application_status_chosen,
  }: reviewArtisanDocumentVerificationRequest_InputType) {
    try {
      console.log(
        `reviewArtisanDocumentVerificationApplication repository function started \nTime: ${Date.now()}`,
      );

      const artisan = await prisma.artisan.update({
        where: {
          id: artisan_id,
          user: { is_deleted: { not: true }, is_suspended: { not: true } },
        },
        data: {
          artisanVerificationDocuments: {
            update: { status: application_status_chosen },
          },
          verified: application_status_chosen === "accepted",
        },

        select: {
          id: true,
          verified: true,
          artisanVerificationDocuments: { select: { status: true } },
        },
      });

      console.log(
        `reviewArtisanDocumentVerificationApplication repository completed \nTime: ${Date.now()}`,
      );

      return artisan;
    } catch (error) {
      const error_message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(
        `reviewArtisanDocumentVerificationApplication repository function Execution failed: ${error_message}`,
      );
      throw error;
    }
  }

  async delete_User_Artisan_Account({
    artisan_id,
  }: delete_User_Artisan_Account_InputType) {}
}
