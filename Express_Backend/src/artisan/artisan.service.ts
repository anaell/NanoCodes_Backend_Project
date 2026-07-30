import { Prisma } from "../../generated/prisma/client.js";
import { formatArtisanEarningsTrendData } from "../utils/format_date.js";
import type { ArtisanRepository } from "./artisan.repository.js";
import type {
  artisanBookingRequestResponse_InputType,
  createOrUpdateArtisanReplyToReview_InputType,
  getArtisanBookingHistory_InputType,
  getArtisanById_InputType,
  getArtisanEarningsStatsCard_InputType,
  getArtisanEarningsTrendData_InputType,
  getArtisanIncomingJobRequests_InputType,
  getArtisanReviewAndRatingStats_InputType,
  getArtisanReviewsAndRating_InputType,
  getArtisanTransactions_InputType,
} from "./artisan.types.js";

export class ArtisanService {
  constructor(private readonly artisanRepository: ArtisanRepository) {}

  async getArtisanByIdService({ artisan_id }: getArtisanById_InputType) {
    const db_response = await this.artisanRepository.getArtisanById({
      artisan_id,
    });

    return db_response;
  }

  async getArtisanIncomingBookingRequestsService({
    artisan_id,
  }: getArtisanIncomingJobRequests_InputType) {
    const db_response =
      await this.artisanRepository.getArtisanIncomingBookingRequests({
        artisan_id,
      });

    return db_response;
  }

  async artisanBookingRequestResponseService({
    artisan_booking_response,
    artisan_id,
    booking_id,
  }: artisanBookingRequestResponse_InputType) {
    const db_response =
      await this.artisanRepository.artisanBookingRequestResponse({
        artisan_booking_response,
        artisan_id,
        booking_id,
      });
  }

  async getArtisanBookingHistoryService({
    artisan_id,
    booking_status,
    limit,
    no_of_days,
    page,
  }: getArtisanBookingHistory_InputType) {
    const db_response = await this.artisanRepository.getArtisanBookingHistory({
      artisan_id,
      booking_status,
      limit,
      no_of_days,
      page,
    });

    return db_response;
  }

  async getArtisanReviewsAndRatingService({
    artisan_id,
    limit,
    page,
  }: getArtisanReviewsAndRating_InputType) {
    const db_response = await this.artisanRepository.getArtisanReviewsAndRating(
      { artisan_id, limit, page },
    );

    return db_response;
  }

  async getArtisanReviewAndRatingStatsService({
    artisan_id,
  }: getArtisanReviewAndRatingStats_InputType) {
    const db_response =
      await this.artisanRepository.getArtisanReviewAndRatingStats({
        artisan_id,
      });

    const artisan_booking_completion_rate =
      (db_response.artisan_completed_bookings /
        db_response.total_artisan_bookings) *
      100;

    const adjusted_db_response = {
      ...db_response,
      artisan_booking_completion_rate,
    };

    return adjusted_db_response;
  }

  async createOrUpdateArtisanReplyToReviewService({
    artisan_id,
    reply,
    review_id,
  }: createOrUpdateArtisanReplyToReview_InputType) {
    const db_response =
      await this.artisanRepository.createOrUpdateArtisanReplyToReview({
        artisan_id,
        reply,
        review_id,
      });

    return db_response;
  }

  async getArtisanEarningsStatsCardService({
    artisan_id,
  }: getArtisanEarningsStatsCard_InputType) {
    const db_response =
      await this.artisanRepository.getArtisanEarningsStatsCard({ artisan_id });

    const {
      total_money_made: artisan_total_money_made,
      total_money_withdrawn: artisan_total_money_withdrawn,
    } = db_response.artisan_available_balance;

    const artisan_current_available_balance = artisan_total_money_made
      ? artisan_total_money_made.minus(artisan_total_money_withdrawn || 0)
      : new Prisma.Decimal(0);

    const artisan_current_month_earnings =
      db_response.artisan_current_month_earnings._sum.amount ||
      new Prisma.Decimal(0);
    const artisan_previous_month_earnings =
      db_response.artisan_previous_month_earnings._sum.amount ||
      new Prisma.Decimal(0);

    const artisan_current_previous_month_earning_difference =
      artisan_current_month_earnings.minus(artisan_previous_month_earnings);

    const artisan_earning_percentage_increase =
      artisan_current_previous_month_earning_difference.isZero() &&
      artisan_previous_month_earnings.isZero()
        ? new Prisma.Decimal(0)
        : artisan_current_previous_month_earning_difference
            .dividedBy(artisan_previous_month_earnings)
            .times(100);

    const adjusted_db_response = {
      ...db_response,
      artisan_current_available_balance,
      artisan_earning_percentage_increase,
    };

    return adjusted_db_response;
  }

  async getArtisanEarningsTrendDataService({
    artisan_id,
    no_of_days,
  }: getArtisanEarningsTrendData_InputType) {
    const db_response =
      await this.artisanRepository.getArtisanEarningsTrendData({
        artisan_id,
        no_of_days,
      });

    const formatted_artisan_earnings_trend_data =
      formatArtisanEarningsTrendData(db_response.artisan_earnings_trend_data);

    return {
      artisan_earnings_trend_data: formatted_artisan_earnings_trend_data,
    };
  }

  async getArtisanTransactionsService({
    artisan_id,
    recent,
  }: getArtisanTransactions_InputType) {
    const db_response = await this.artisanRepository.getArtisanTransactions({
      artisan_id,
      recent,
    });

    return db_response;
  }
}
