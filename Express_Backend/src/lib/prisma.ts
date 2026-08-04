import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE_NAME,
  MYSQL_CA_BASE64,
} = process.env;

if (
  !MYSQL_HOST ||
  !MYSQL_PORT ||
  !MYSQL_USER ||
  !MYSQL_PASSWORD ||
  !MYSQL_DATABASE_NAME ||
  !MYSQL_CA_BASE64 // If it is not required please comment this line out
) {
  throw new Error(
    `Please define the ${MYSQL_HOST && "MYSQL_HOST"},  ${MYSQL_PORT && "MYSQL_PORT"}, ${MYSQL_USER && "MYSQL_USER"}, ${MYSQL_PASSWORD && "MYSQL_PASSWORD"}, ${MYSQL_DATABASE_NAME && "MYSQL_DATABASE_NAME"} and ${MYSQL_CA_BASE64 && "MYSQL_CA_BASE64 (the mysql certificate if it is required)"} environment variable inside .env`,
  );
}

// Read the CA cert file into memory from your project root
// const caCertPath = path.resolve(process.cwd(), "ca.pem");
const caCertData = Buffer.from(MYSQL_CA_BASE64, "base64").toString("utf-8");

// console.log(caCertPath);

const adapter = new PrismaMariaDb({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE_NAME,
  port: Number(MYSQL_PORT),
  connectionLimit: 5,
  ssl: {
    rejectUnauthorized: true,
    ca: caCertData,
  },
});
const prisma = new PrismaClient({ adapter });
export { prisma };
