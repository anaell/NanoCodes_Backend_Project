import {
  formatGrowthData,
  formatRevenueTrendData,
} from "../utils/format_date.js";
import {
  percentage_growth_calculator,
  transaction_success_rate_calculator,
} from "../utils/growth_calc.js";
import type { AdminRepository } from "./admin.repository.js";
import type {
  deletePlatformUser_InputType,
  getAllBookings_InputType,
  getAllReviews_InputType,
  getAllTransactionLogs_InputType,
  getArtisanPendingDocumentVerificationRequest_InputType,
  getPlatformUsers_InputType,
  getRevenueTrend_InputType,
  reviewArtisanDocumentVerificationRequest_InputType,
  updatePlatformSettings_InputType,
} from "./admin.types.js";

export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async getPlatformStatsService(no_of_days?: number) {
    const db_response = await this.adminRepository.getPlatformStats(no_of_days);

    const formatted_user_platform_growth = formatGrowthData(
      db_response.user_platform_growth,
    );
    const formatted_artisan_platform_growth = formatGrowthData(
      db_response.artisan_platform_growth,
    );

    const formatted_db_response = {
      ...db_response,
      artisan_platform_growth: formatted_artisan_platform_growth,
      user_platform_growth: formatted_user_platform_growth,
    };

    return formatted_db_response;
  }

  async getPlatformUsersService({
    search_term,
    role,
    status,
    limit,
    page,
    artisan_document_verification_status,
  }: getPlatformUsers_InputType) {
    // Build an object and dynamically omit keys if their value is undefined
    const queryInput: getPlatformUsers_InputType = {
      search_term,
      status,
      role,
      limit,
      page,
      artisan_document_verification_status,
    };

    const db_response = await this.adminRepository.getPlatformUsers(queryInput);

    return db_response;
  }

  async deletePlatformUserService({ user_id }: deletePlatformUser_InputType) {
    const db_response = await this.adminRepository.deletePlatformUser({
      user_id,
    });

    return db_response;
  }

  async reviewArtisanDocumentVerificationRequestService({
    artisan_id,
    application_status_chosen,
  }: reviewArtisanDocumentVerificationRequest_InputType) {
    const db_response =
      await this.adminRepository.reviewArtisanDocumentVerificationRequest({
        artisan_id,
        application_status_chosen,
      });

    return db_response;
  }

  async getAllArtisansWithPendingDocumentVerificationRequestService() {
    const db_response =
      await this.adminRepository.getAllArtisansWithPendingDocumentVerificationRequest();

    return db_response;
  }

  async getArtisanPendingDocumentVerificationRequestService({
    artisan_id,
  }: getArtisanPendingDocumentVerificationRequest_InputType) {
    const db_response =
      await this.adminRepository.getArtisanPendingDocumentVerificationRequest({
        artisan_id,
      });

    return db_response;
  }

  async getAllBookingsService({
    limit,
    no_of_days,
    page,
    search_term,
    status,
  }: getAllBookings_InputType) {
    const db_response = await this.adminRepository.getAllBookings({
      limit,
      no_of_days,
      page,
      search_term,
      status,
    });

    return db_response;
  }

  async getAllBookingsStatCardService() {
    const db_response = await this.adminRepository.getAllBookingsStatCard();

    const percentage_active_bookings_growth = percentage_growth_calculator(
      db_response.active_booking_past_month_count,
      db_response.active_bookings,
    );

    const percentage_pending_bookings_growth = percentage_growth_calculator(
      db_response.pending_booking_past_month_count,
      db_response.pending_bookings,
    );

    const percentage_growths = {
      percentage_active_bookings_growth,
      percentage_pending_bookings_growth,
    };

    return { ...db_response, percentage_growths };
  }

  async getAllReviewsService({
    limit,
    page,
    reported_reviews,
    search_term,
  }: getAllReviews_InputType) {
    const db_response = await this.adminRepository.getAllReviews({
      limit,
      page,
      reported_reviews,
      search_term,
    });

    return db_response;
  }

  async getEarningsOverviewCardsService() {
    const db_response = await this.adminRepository.getEarningsOverviewCards();

    const past_month_cumulative_revenue_calculated =
      Number(db_response.past_total_revenue._sum.amount) || 0;
    const present_month_cumulative_revenue_calculated = Number(
      db_response.total_revenue,
    );

    const percentage_revenue_growth = percentage_growth_calculator(
      past_month_cumulative_revenue_calculated,
      present_month_cumulative_revenue_calculated,
    );

    const transaction_fails = db_response.processing_transactions;
    const transaction_successes = db_response.completed_transactions;

    const percentage_success_rate = transaction_success_rate_calculator(
      transaction_fails,
      transaction_successes,
    );

    const percentage_growths = {
      percentage_revenue_growth,
      percentage_success_rate,
    };
    return { ...db_response, percentage_growths };
  }

  async getAllTransactionLogsService({
    limit,
    page,
    search_term,
  }: getAllTransactionLogs_InputType) {
    const db_response = await this.adminRepository.getAllTransactionLogs({
      limit,
      page,
      search_term,
    });

    return db_response;
  }

  async getRevenueTrendService({ days }: getRevenueTrend_InputType) {
    const db_response = await this.adminRepository.getRevenueTrend({ days });

    const formatted_db_response = formatRevenueTrendData(db_response);

    return formatted_db_response;
  }

  async getPlatformSettingsService() {
    const db_response = this.adminRepository.getPlatformSettings();

    return db_response;
  }

  async updatePlatformSettingsService({
    maintenance_mode,
    new_platform_logo_url,
    new_platform_name,
    new_support_email_address,
  }: updatePlatformSettings_InputType) {
    const db_response = this.adminRepository.updatePlatformSettings({
      maintenance_mode,
      new_platform_logo_url,
      new_platform_name,
      new_support_email_address,
    });

    return db_response;
  }
}
