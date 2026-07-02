import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE_NAME,
} = process.env;

if (
  !MYSQL_HOST ||
  !MYSQL_PORT ||
  !MYSQL_USER ||
  !MYSQL_PASSWORD ||
  !MYSQL_DATABASE_NAME
) {
  throw new Error(
    "Please define the MYSQL_HOST,  MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD and MYSQL_DATABASE_NAME environment variable inside .env",
  );
}

const adapter = new PrismaMariaDb({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE_NAME,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });
export { prisma };
