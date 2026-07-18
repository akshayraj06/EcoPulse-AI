import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/database.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const startServer = async () => {
  await connectDB();

  const app = express();
  const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5175",
    "http://127.0.0.1:5175",
  ].filter(Boolean);
  const isLocalViteOrigin = (origin) =>
    /^http:\/\/(localhost|127\.0\.0\.1):517\d$/.test(origin || "");

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          frameSrc: ["'self'", "https://www.google.com", "https://maps.google.com"],
          imgSrc: ["'self'", "data:", "https:"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "https:", "'unsafe-inline'"],
          connectSrc: ["'self'", "http://localhost:5000", "http://127.0.0.1:5000"],
        },
      },
    }),
  );
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || isLocalViteOrigin(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error(`CORS blocked origin: ${origin}`));
      },
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "EcoPulse AI Backend is Running",
    });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/complaints", complaintRoutes);
  app.use("/api/notifications", notificationRoutes);

  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`Server running on http://localhost:${PORT}`);
    }
  });
};

startServer().catch((error) => {
  console.error("Server failed to start:", error);
});
