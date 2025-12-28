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

app.get("/", (req, res) => {
  res.json({ status: "API running" });
});


const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

// Load Swagger JSON directly (fallback to runtime generation if file missing)
let swaggerSpec;
try {
  swaggerSpec = require("./swagger.json");
  console.log("Loaded static swagger.json");
} catch (e) {
  console.log("swagger.json not found, generating at runtime");
  swaggerSpec = require("./config/swagger");
}

// Routes
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));

// Debug route to list files (remove in production if sensitive)
app.get("/debug-files", (req, res) => {
  const fs = require("fs");
  const path = require("path");
  
  const listDir = (dir) => {
    try {
      return fs.readdirSync(dir);
    } catch (e) {
      return e.message;
    }
  };

  res.json({
    cwd: process.cwd(),
    __dirname,
    rootDir: listDir(process.cwd()),
    routesDir: listDir(path.join(process.cwd(), "routes")),
    configDir: listDir(path.join(process.cwd(), "config")),
    dirnameFiles: listDir(__dirname),
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Internal Server Error", 
    error: process.env.NODE_ENV === "development" ? err.message : undefined 
  });
});

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
