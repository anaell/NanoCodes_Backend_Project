import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

interface jwtAccessTokenGenerator_InputType {
  email: string;
  id: string;
  name: string;
}

export function jwtAccessTokenGenerator({
  email,
  id,
  name,
}: jwtAccessTokenGenerator_InputType): string {
  const secret_key = process.env.ADMIN_JWT_ACCESS_TOKEN_SECRET;
  if (!secret_key) {
    throw new Error(
      "Poor Runtime environment setup leading to an Internal server error. A Secret key has not been defined",
    );
  }
  const access_token = jwt.sign({ email, id, name }, secret_key, {
    expiresIn: "15m",
  });

  return access_token;
}

interface jwtRefreshTokenGenerator_InputType {
  email: string;
  id: string;
  name: string;
}

export function jwtRefreshTokenGenerator({
  email,
  id,
  name,
}: jwtRefreshTokenGenerator_InputType): string {
  const secret_key = process.env.ADMIN_JWT_REFRESH_TOKEN_SECRET;
  if (!secret_key) {
    throw new Error(
      "Poor Runtime environment setup leading to an Internal server error. A Secret key has not been defined",
    );
  }
  const refresh_token = jwt.sign({ email, id, name }, secret_key, {
    expiresIn: "7d",
  });

  return refresh_token;
}
