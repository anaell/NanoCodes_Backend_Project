import type { ArtisanRepository } from "./artisan.repository.js";
import type {
  artisanBookingRequestResponse_InputType,
  getArtisanById_InputType,
  getArtisanIncomingJobRequests_InputType,
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
}
