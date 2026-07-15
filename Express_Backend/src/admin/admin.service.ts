import { formatGrowthData } from "../utils/format_date.js";
import type { AdminRepository } from "./admin.repository.js";
import type {
  deletePlatformUser_InputType,
  getArtisanPendingDocumentVerificationRequest_InputType,
  getPlatformUsers_InputType,
  reviewArtisanDocumentVerificationRequest_InputType,
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
}
