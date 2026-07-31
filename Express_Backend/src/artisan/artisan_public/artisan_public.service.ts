import type { PublicArtisanRepository } from "./artisan_public.repository.js";
import type {
  getArtisanById_InputType,
  getArtisanCompletedBookings_InputType,
  getArtisanReviews_InputType,
  getArtisans_InputType,
} from "./artisan_public.types.js";

export class PublicArtisanService {
  constructor(
    private readonly publicArtisanRepository: PublicArtisanRepository,
  ) {}

  async getFeaturedArtisansService() {
    const db_response =
      await this.publicArtisanRepository.getFeaturedArtisans();

    return db_response;
  }

  async getArtisanByIdService({ artisan_id }: getArtisanById_InputType) {
    const db_response = await this.publicArtisanRepository.getArtisanById({
      artisan_id,
    });

    return db_response;
  }

  async getArtisanCompletedBookingsService({
    artisan_id,
    limit,
    page,
  }: getArtisanCompletedBookings_InputType) {
    const db_response =
      await this.publicArtisanRepository.getArtisanCompletedBookings({
        artisan_id,
        limit,
        page,
      });

    return db_response;
  }

  async getArtisanReviewsService({
    artisan_id,
    limit,
    page,
  }: getArtisanReviews_InputType) {
    const db_response = await this.publicArtisanRepository.getArtisanReviews({
      artisan_id,
      limit,
      page,
    });

    return db_response;
  }

  async getArtisansService({
    experience,
    limit,
    location,
    min_rating,
    page,
    search_term,
  }: getArtisans_InputType) {
    const db_response = await this.publicArtisanRepository.getArtisans({
      experience,
      limit,
      location,
      min_rating,
      page,
      search_term,
    });

    return db_response;
  }
}
