import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import type { Request, Response } from "express";

import AdminRoutes from "./admin/admin.route.js";
import AdminAuthRoutes from "./admin/admin_auth/admin_auth.route.js";
import ArtisanRoutes from "./artisan/artisan.route.js";
import PublicArtisanRoutes from "./artisan/artisan_public/artisan_public.route.js";

import cookieParser from "cookie-parser";
import { verifyAdminJWTMiddleware } from "./admin/admin.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// 1. Swagger definition configuration
const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ServiceConnect Backend API",
      version: "1.0.0",
      description:
        "The APIs for ServiceConnect detailing the possible request to be made to the endpoints and their respective responses",
    },

    // THIS COMPONENTS BLOCK HERE
    components: {
      // This is to define the security scheme being used once and for all.
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT Bearer token",
        },
      },

      // These are to make it easier to reuse the Error and Success Response Structure
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "error",
            },
            message: {
              oneOf: [
                {
                  type: "string",
                  example: "Something went wrong",
                },
                {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      field: {
                        type: "string",
                        example: "days",
                      },
                      message: {
                        type: "string",
                        example: '"days" must be greater than 0',
                      },
                    },
                  },
                },
              ],
            },
          },
        },

        SuccessResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "success",
            },
            data: {
              type: "object",
            },
          },
        },
      },
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development server",
      },
      {
        url: "https://nanocodes-backend-project.onrender.com",
        description: "Live server",
      },
    ],
  },

  // 2. Path to the API docs (where your comments live)
  // This looks at all .ts files inside the src folder
  apis: ["./src/docs/**/*.ts", "./src/routes/*.ts"],
};

// 3. Initialize swagger-jsdoc
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// 4. Serve Swagger UI HTML page
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req: Request, res: Response) => {
  res.send("Your Project Backend Server is Running Now");
});

app.use("/api", AdminAuthRoutes);

app.use("/api", verifyAdminJWTMiddleware, AdminRoutes);

app.use("/api", ArtisanRoutes);

app.use("/api/public", PublicArtisanRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
  console.log(process.env.PORT);
});
