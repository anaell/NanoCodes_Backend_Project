import "dotenv/config";
// import { PrismaClient } from '../../generated/prisma/client.ts'
import { PrismaClient } from "../../prisma/generated/prisma/index.js";

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
  !MYSQL_CA_BASE64
) {
  throw new Error(
    "Please define the MYSQL_HOST,  MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD and MYSQL_DATABASE_NAME environment variable inside .env",
  );
}

const cate = Buffer.from(MYSQL_CA_BASE64!, "base64").toString("utf-8");

const adapter = new PrismaMariaDb({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE_NAME,
  port: Number(MYSQL_PORT),
  connectionLimit: 5,
  connectTimeout: 20000,
  ssl: {
    rejectUnauthorized: true,
    ca: cate
  }
});
const prisma = new PrismaClient({ adapter });
const connectDB = async () => {
  try{
    await prisma.$connect();
    console.log("Your Database is connected Successfully")
  }catch(err){
    console.error("Database connection failed", err)
  }
}

connectDB();
export { prisma };
