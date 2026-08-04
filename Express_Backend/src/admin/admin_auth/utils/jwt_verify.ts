import jwt from "jsonwebtoken";

interface verifier_InputType {
  token: string;
}

export interface AdminJwtPayload extends jwt.JwtPayload {
  email: string;
  id: string;
  name: string;
}

export function accessTokenVerifier({
  token,
}: verifier_InputType): AdminJwtPayload {
  const secret_key = process.env.ADMIN_JWT_ACCESS_TOKEN_SECRET;
  if (!secret_key) {
    throw new Error(
      "Poor Runtime environment setup leading to an Internal server error. A Secret key has not been defined",
    );
  }

  const verified_token = jwt.verify(token, secret_key);
  return verified_token as AdminJwtPayload;
}

export function refreshTokenVerifier({
  token,
}: verifier_InputType): AdminJwtPayload {
  const secret_key = process.env.ADMIN_JWT_REFRESH_TOKEN_SECRET;
  if (!secret_key) {
    throw new Error(
      "Poor Runtime environment setup leading to an Internal server error. A Secret key has not been defined",
    );
  }

  const verified_token = jwt.verify(token, secret_key);
  return verified_token as AdminJwtPayload;
}
