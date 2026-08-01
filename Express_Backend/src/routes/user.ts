import express from "express";
import { getUserDashboard } from "../controllers/usercontroller.ts";

const dashboardRouter = express.Router();

dashboardRouter.get("/user/:id", getUserDashboard);


export default dashboardRouter;
