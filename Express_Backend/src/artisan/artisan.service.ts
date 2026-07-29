import type { ArtisanRepository } from "./artisan.repository.js";
import type {
  artisanBookingRequestResponse_InputType,
  createOrUpdateArtisanReplyToReview_InputType,
  getArtisanBookingHistory_InputType,
  getArtisanById_InputType,
  getArtisanIncomingJobRequests_InputType,
  getArtisanReviewAndRatingStats_InputType,
  getArtisanReviewsAndRating_InputType,
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
}
