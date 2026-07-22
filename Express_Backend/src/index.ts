import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import type { Request, Response } from "express";
import AdminRoutes from "./admin/admin.route.js";
import cookieParser from "cookie-parser";
import { verifyAdminJWTMiddleware } from "./admin/admin.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Your Project Backend Server is Running Now");
});

app.use("/api", verifyAdminJWTMiddleware, AdminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
  console.log(process.env.PORT);
});
