import type { PublicArtisanRepository } from "./artisan_public.repository.js";

export class PublicArtisanService {
  constructor(
    private readonly publicArtisanRepository: PublicArtisanRepository,
  ) {}

  async getFeaturedArtisansService() {
    const db_response =
      await this.publicArtisanRepository.getFeaturedArtisans();

    return db_response;
  }
}
