const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors({ origin: "*" }));
app.use(express.json());

/* ---------------- ROOT HEALTH CHECK ---------------- */
/**
 * 🔥 IMPORTANT
 * This prevents 404 on Vercel root URL
 */
app.get("/", (req, res) => {
  res.json({
    status: "Backend API is running",
    env: process.env.NODE_ENV || "development",
    endpoints: {
      users: "/api/users",
      contacts: "/api/contacts",
      docs: "/api/docs (local only)",
    },
  });
});

/* ---------------- ROUTES ---------------- */

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));

/* ---------------- SWAGGER (LOCAL ONLY) ---------------- */
/**
 * ❗ Swagger on Vercel causes issues
 * So we enable it ONLY for local development
 */
if (process.env.NODE_ENV !== "production") {
  const swaggerUi = require("swagger-ui-express");
  const swaggerSpec = require("./config/swagger");

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

/* ---------------- LOCAL SERVER START ---------------- */

const PORT = process.env.PORT || 5000;

/**
 * 🔥 IMPORTANT
 * - Local: starts server + sync DB
 * - Vercel: ONLY exports app (no listen, no sync)
 */
if (require.main === module) {
  const { connectDB, sequelize } = require("./config/db");

  connectDB()
    .then(() => {
      sequelize.sync().then(() => {
        app.listen(PORT, () =>
          console.log(`🚀 Server running on http://localhost:${PORT}`)
        );
      });
    })
    .catch((err) => {
      console.error("❌ DB connection failed:", err);
    });
}

module.exports = app;
