const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

/**
 * 🔥 IMPORTANT FIX
 * Serve Swagger UI assets explicitly
 */
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  })
);

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Admin Panel API running on Vercel" });
});

// ❌ NO app.listen()
// ❌ NO dotenv.config()
// ❌ NO DB connect here

module.exports = app;
