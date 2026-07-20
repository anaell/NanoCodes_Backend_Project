import { prisma } from "../lib/prisma.js";
import { getToday } from "../utils/format_date.js";
import type {
  delete_User_Artisan_Account_InputType,
  deletePlatformUser_InputType,
  getAllBookings_InputType,
  getAllBookings_WhereType,
  getAllReviews_InputType,
  getAllReviews_WhereType,
  getAllTransactionLogs_InputType,
  getAllTransactionLogs_WhereType,
  getArtisanPendingDocumentVerificationRequest_InputType,
  getPlatformUsers_InputType,
  getPlatformUsers_WhereType,
  getRevenueTrend_InputType,
  reviewArtisanDocumentVerificationRequest_InputType,
  updatePlatformSettings_InputType,
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
          { f_name: { contains: search_term.toLowerCase() } },
          { l_name: { contains: search_term.toLowerCase() } },
          { email: { contains: search_term.toLowerCase() } },
          { id: { contains: search_term.toLowerCase() } },
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
      console.log(
        `deletePlatformUser repository function started \nTime: ${Date.now()}`,
      );

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

      console.log(
        `deletePlatformUser repository completed \nTime: ${Date.now()}`,
      );

      return delete_user;
    } catch (error) {
      const error_message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(
        `deletePlatformUser repository function Execution failed: ${error_message}`,
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
        `reviewArtisanDocumentVerificationRequest repository function started \nTime: ${Date.now()}`,
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
        `reviewArtisanDocumentVerificationRequest repository completed \nTime: ${Date.now()}`,
      );

      return artisan;
    } catch (error) {
      const error_message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(
        `reviewArtisanDocumentVerificationRequest repository function Execution failed: ${error_message}`,
      );
      throw error;
    }
  }

  async getAllArtisansWithPendingDocumentVerificationRequest() {
    try {
      console.log(
        `getArtisansWithPendingVerificationRequest repository function started \nTime: ${Date.now()}`,
      );

      const [
        total_artisans_with_pending_reviews,
        artisans_with_pending_reviews,
      ] = await prisma.$transaction([
        prisma.artisan.count({
          where: {
            artisanVerificationDocuments: { status: "pending" },
            user: { is_deleted: false },
          },
        }),
        prisma.artisan.findMany({
          where: {
            artisanVerificationDocuments: { status: "pending" },
            user: { is_deleted: false },
          },
          select: {
            id: true,
            user_id: true,
            main_skill: true,
            location: true,
            artisanVerificationDocuments: {
              select: { status: true, created_at: true },
            },
            user: {
              select: {
                f_name: true,
                l_name: true,
                profile_pic_url: true,
              },
            },
          },
          orderBy: { artisanVerificationDocuments: { created_at: "desc" } },
        }),
      ]);
      console.log(
        `getArtisansWithPendingVerificationRequest repository completed \nTime: ${Date.now()}`,
      );

      return {
        total_artisans_with_pending_reviews,
        artisans_with_pending_reviews,
      };
    } catch (error) {
      const error_message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(
        `reviewArtisanDocumentVerificationApplication repository function Execution failed: ${error_message}`,
      );
      throw error;
    }
  }

  async getArtisanPendingDocumentVerificationRequest({
    artisan_id,
  }: getArtisanPendingDocumentVerificationRequest_InputType) {
    try {
      console.log(
        `getArtisanPendingDocumentVerificationRequest repository function started \nTime: ${Date.now()}`,
      );

      const artisan = await prisma.artisan.findFirstOrThrow({
        where: {
          id: artisan_id,
          user: { is_deleted: false, is_suspended: false },
          artisanVerificationDocuments: { status: "pending" },
        },
        select: {
          id: true,
          user_id: true,
          about_artisan: true,
          main_skill: true,
          location: true,
          artisanVerificationDocuments: {
            select: {
              status: true,
              nin_doc_url: true,
              profession_credential_doc_url: true,
            },
          },
          user: {
            select: { f_name: true, l_name: true, profile_pic_url: true },
          },
        },
      });

      console.log(
        `getArtisanPendingDocumentVerificationRequest repository completed \nTime: ${Date.now()}`,
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

  async getAllBookings({
    search_term,
    no_of_days,
    status,
    page = 1,
    limit = 10,
  }: getAllBookings_InputType) {
    try {
      const whereBase: getAllBookings_WhereType = { is_cancelled: false };

      if (status) {
        whereBase.status = status;
      }

      if (search_term) {
        whereBase.OR = [
          {
            customer: {
              f_name: { contains: search_term },
              l_name: { contains: search_term },
            },
          },
          {
            artisan: {
              user: {
                f_name: { contains: search_term },
                l_name: { contains: search_term },
              },
            },
          },
        ];
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

      const number_to_skip: number = (page - 1) * limit;

      const [total_bookings, bookings] = await prisma.$transaction([
        prisma.booking.count({ where: whereBase }),
        prisma.booking.findMany({
          where: whereBase,
          take: limit,
          skip: number_to_skip,
          orderBy: { created_at: "desc" },
          select: {
            id: true,
            work_to_be_done: true,
            customer: { select: { f_name: true, l_name: true } },
            artisan: {
              select: { user: { select: { f_name: true, l_name: true } } },
            },
            created_at: true,
            booking_price: true,
            status: true,
          },
        }),
      ]);

      const totalPages = Math.ceil(total_bookings / limit);

      return {
        total_bookings,
        bookings,
        meta: {
          total_bookings,
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
        `reviewArtisanDocumentVerificationApplication repository function Execution failed: ${error_message}`,
      );
      throw error;
    }
  }

  async getAllBookingsStatCard() {
    try {
      const fixed_reference_day_to_calc_growth_rating = 30;
      const date_range_to_use_for_growth_rating_calc = new Date();
      date_range_to_use_for_growth_rating_calc.setDate(
        date_range_to_use_for_growth_rating_calc.getDate() -
          fixed_reference_day_to_calc_growth_rating,
      );

      const today = getToday();

      const [bookings_completed_today, total_revenue] =
        await prisma.$transaction([
          prisma.booking.count({
            where: { status: "completed", booking_end_date: today },
          }),
          prisma.booking.aggregate({
            where: { status: "completed" },
            _sum: { booking_price: true },
          }),
        ]);

      const [active_bookings, active_booking_past_month_count] =
        await prisma.$transaction([
          prisma.booking.count({
            where: {
              OR: [{ status: "in_progress" }, { status: "pending" }],
            },
          }),
          prisma.booking.count({
            where: {
              OR: [{ status: "in_progress" }, { status: "pending" }],
              created_at: {
                lte: date_range_to_use_for_growth_rating_calc,
              },
            },
          }),
        ]);

      const [pending_bookings, pending_booking_past_month_count] =
        await prisma.$transaction([
          prisma.booking.count({
            where: {
              status: "pending",
            },
          }),
          prisma.booking.count({
            where: {
              status: "pending",
              created_at: {
                lte: date_range_to_use_for_growth_rating_calc,
              },
            },
          }),
        ]);

      return {
        bookings_completed_today,
        total_revenue,
        active_bookings,
        active_booking_past_month_count,
        pending_bookings,
        pending_booking_past_month_count,
      };
    } catch (error) {
      const error_message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(
        `reviewArtisanDocumentVerificationApplication repository function Execution failed: ${error_message}`,
      );
      throw error;
    }
  }

  async getAllReviews({
    reported_reviews,
    limit = 10,
    page = 1,
    search_term,
  }: getAllReviews_InputType) {
    try {
      const whereBase: getAllReviews_WhereType = {};

      if (reported_reviews) {
        whereBase.reply = { report_customer_review: reported_reviews };
      }

      if (search_term) {
        whereBase.OR = [
          { comment: { contains: search_term } },
          {
            customer: {
              f_name: { contains: search_term },
              l_name: { contains: search_term },
            },
            artisan: {
              user: {
                f_name: { contains: search_term },
                l_name: { contains: search_term },
              },
            },
          },
        ];
      }

      const number_to_skip: number = (page - 1) * limit;

      const [
        total_all_artisans_reviews,
        all_artisans_reviews,
        reported_reviews_count,
      ] = await prisma.$transaction([
        prisma.booking_Review.count({ where: whereBase }),
        prisma.booking_Review.findMany({
          where: whereBase,
          orderBy: { created_at: "desc" },
          take: limit,
          skip: number_to_skip,
          select: {
            customer: { select: { f_name: true, l_name: true } },
            artisan: {
              select: { user: { select: { f_name: true, l_name: true } } },
            },
            rating: true,
            comment: true,
            created_at: true,
            status: true,
          },
        }),
        prisma.booking_Review.count({
          where: { reply: { report_customer_review: true } },
        }),
      ]);

      const totalPages = Math.ceil(total_all_artisans_reviews / limit);

      return {
        all_artisans_reviews,
        meta: {
          total_reported_reviews: reported_reviews_count,
          total_reviews: total_all_artisans_reviews,
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
        `reviewArtisanDocumentVerificationApplication repository function Execution failed: ${error_message}`,
      );
      throw error;
    }
  }

  async getEarningsOverviewCards() {
    try {
      const fixed_reference_day_to_calc_growth_rating = 30;
      const date_range_to_use_for_growth_rating_calc = new Date();
      date_range_to_use_for_growth_rating_calc.setDate(
        date_range_to_use_for_growth_rating_calc.getDate() -
          fixed_reference_day_to_calc_growth_rating,
      );

      const [
        past_total_revenue,
        total_revenue,
        platform_commission,
        processing_transactions,
        completed_transactions,
      ] = await prisma.$transaction([
        prisma.payment.aggregate({
          where: {
            status: "successful",
            payment_completed_at: {
              lte: date_range_to_use_for_growth_rating_calc,
            },
          },
          _sum: { amount: true },
        }),
        prisma.payment.aggregate({
          where: { status: "successful" },
          _sum: { amount: true },
        }),
        prisma.payment.aggregate({
          where: { status: "successful" },
          _sum: { commission: true },
        }),
        prisma.payment.count({
          where: {
            status: "processing",
          },
        }),
        prisma.payment.count({
          where: { status: "successful" },
        }),
      ]);

      const [pending_payouts, number_of_artisans_with_pending_payouts] =
        await prisma.$transaction([
          prisma.booking.aggregate({
            where: {
              status: "completed",
              none: {
                payment_details: true,
              },
            },
            _sum: { booking_price: true },
          }),
          prisma.artisan.count({
            where: {
              bookings: {
                some: { status: "completed", payment_details: { is: null } },
              },
            },
          }),
        ]);

      return {
        past_total_revenue,
        total_revenue,
        platform_commission,
        processing_transactions,
        completed_transactions,
        pending_payouts,
        number_of_artisans_with_pending_payouts,
      };
    } catch (error) {
      const error_message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(
        `reviewArtisanDocumentVerificationApplication repository function Execution failed: ${error_message}`,
      );
      throw error;
    }
  }

  async getAllTransactionLogs({
    limit = 10,
    page = 1,
    search_term,
  }: getAllTransactionLogs_InputType) {
    try {
      const whereBase: getAllTransactionLogs_WhereType = {
        OR: [{ status: "processing" }, { status: "successful" }],
        booking: { status: "completed" },
      };

      if (search_term) {
        const add_to_whereBase = [
          {
            artisan: {
              user: {
                f_name: { contains: search_term },
                l_name: { contains: search_term },
              },
            },
          },
          {
            customer: {
              f_name: { contains: search_term },
              l_name: { contains: search_term },
            },
          },
          { booking: { work_to_be_done: { contains: search_term } } },
          { id: search_term },
        ];
        whereBase.OR.push(add_to_whereBase);
      }

      const number_to_skip = (page - 1) * limit;

      const [total_all_transactions, all_transactions] =
        await prisma.$transaction([
          prisma.payment.count({
            where: whereBase,
          }),
          prisma.payment.findMany({
            where: whereBase,
            orderBy: { created_at: "desc" },
            take: limit,
            skip: number_to_skip,
            select: {
              id: true,
              created_at: true,
              payment_completed_at: true,
              commission: true,
              amount: true,
              booking: { select: { work_to_be_done: true } },
              artisan: {
                select: { user: { select: { f_name: true, l_name: true } } },
              },
              customer: {
                select: { f_name: true, l_name: true },
              },
              status: true,
            },
          }),
        ]);

      const totalPages = Math.ceil(total_all_transactions / limit);

      return {
        all_transactions,
        meta: {
          total_transactions: total_all_transactions,
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
        `reviewArtisanDocumentVerificationApplication repository function Execution failed: ${error_message}`,
      );
      throw error;
    }
  }

  async getRevenueTrend({ days }: getRevenueTrend_InputType) {
    try {
      const date_range = new Date();
      date_range.setDate(Date.now() - (days || 30));

      const revenue_trend_data = await prisma.payment.groupBy({
        where: {
          status: "successful",
          payment_completed_at: { gte: date_range },
        },
        by: "payment_completed_at",
        _sum: { amount: true },
      });

      return revenue_trend_data;
    } catch (error) {
      const error_message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(
        `reviewArtisanDocumentVerificationApplication repository function Execution failed: ${error_message}`,
      );
      throw error;
    }
  }

  async getPlatformSettings() {
    try {
      const platform_settings = await prisma.system_Info.findUniqueOrThrow({
        where: { is_singleton: true },
        select: {
          maintenance_mode: true,
          platform_logo_url: true,
          platform_name: true,
          support_email: true,
        },
      });

      return platform_settings;
    } catch (error) {
      const error_message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(
        `reviewArtisanDocumentVerificationApplication repository function Execution failed: ${error_message}`,
      );
      throw error;
    }
  }

  async updatePlatformSettings({
    new_platform_name,
    new_support_email_address,
    maintenance_mode,
    new_platform_logo_url,
  }: updatePlatformSettings_InputType) {
    try {
      const updated_platform_settings = await prisma.system_Info.upsert({
        where: { is_singleton: true },
        create: {
          platform_name: "ServiceConnect Nigeria",
          platform_logo_url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS75pE9KTptcKc2aYczaY9RiGfawSYIi8KAY9UVuLpExUsKXSAkW2VOUIo&s",
          support_email: "support@serviceconnect.com.ng",
        },
        update: {
          maintenance_mode: maintenance_mode,
          platform_logo_url: new_platform_logo_url,
          platform_name: new_platform_name,
          support_email: new_support_email_address,
        },
        omit: { id: true, is_singleton: true, updated_at: true },
      });

      return updated_platform_settings;
    } catch (error) {
      const error_message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(
        `reviewArtisanDocumentVerificationApplication repository function Execution failed: ${error_message}`,
      );
      throw error;
    }
  }
}
