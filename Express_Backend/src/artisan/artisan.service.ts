import type { ArtisanRepository } from "./artisan.repository.js";
import type {
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

  async getArtisanIncomingJobRequestsService({
    artisan_id,
  }: getArtisanIncomingJobRequests_InputType) {
    const db_response =
      await this.artisanRepository.getArtisanIncomingJobRequests({
        artisan_id,
      });

    return db_response;
  }
}
