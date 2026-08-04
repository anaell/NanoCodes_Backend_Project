import bcrypt from "bcryptjs";
import type { AdminAuthRepository } from "./admin_auth.repository.js";
import type {
  createAdminUser_InputType,
  getAdminUser_InputType,
} from "./admin_auth.types.js";
import {
  jwtAccessTokenGenerator,
  jwtRefreshTokenGenerator,
} from "./utils/jwt_generator.js";
import { refreshTokenVerifier } from "./utils/jwt_verify.js";

export class AdminAuthService {
  constructor(private readonly adminAuthRepository: AdminAuthRepository) {}

  async LoginService({ email, password }: getAdminUser_InputType) {
    const db_response = await this.adminAuthRepository.getAdminUser({
      email,
      password,
    });

    const jwt_payload = {
      email: db_response.email,
      name: db_response.name,
      id: db_response.admin_id,
    };

    const user_access_token = jwtAccessTokenGenerator(jwt_payload);
    const user_refresh_token = jwtRefreshTokenGenerator(jwt_payload);

    return {
      ...db_response,
      token: user_access_token,
      refresh_token: user_refresh_token,
    };
  }

  async SignupService({ email, name, password }: createAdminUser_InputType) {
    const hashed_password = await bcrypt.hash(password, 10);

    const db_response = await this.adminAuthRepository.createAdminUser({
      email,
      name,
      password: hashed_password,
    });

    const jwt_payload = {
      email: db_response.email,
      name: db_response.name,
      id: db_response.admin_id,
    };

    const user_access_token = jwtAccessTokenGenerator(jwt_payload);
    const user_refresh_token = jwtRefreshTokenGenerator(jwt_payload);

    return {
      ...db_response,
      token: user_access_token,
      refresh_token: user_refresh_token,
    };
  }

  async RefreshAccessTokenService({
    refresh_token,
  }: {
    refresh_token: string;
  }) {
    const verified_refresh_token_payload_extracted = refreshTokenVerifier({
      token: refresh_token,
    });

    const { id: admin_id } = verified_refresh_token_payload_extracted;

    const db_response = await this.adminAuthRepository.getAdminUserById({
      admin_id,
    });

    const jwt_payload = {
      email: db_response.email,
      name: db_response.name,
      id: db_response.admin_id,
    };

    const access_token = jwtAccessTokenGenerator(jwt_payload);

    return { token: access_token };
  }
}
