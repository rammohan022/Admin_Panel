const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db");
const User = require("./models/User");
const Contact = require("./models/Contact");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// Routes
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));

const PORT = process.env.PORT || 5000;

// Export app for Vercel
module.exports = app;

// Start server only if run directly (Local development)
if (require.main === module) {
  // Sync DB (auto-create tables if not exists)
  sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
} else {
  // For Vercel, ensure DB connection
  connectDB();
}
