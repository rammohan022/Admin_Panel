const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Webex Admin Panel API",
      version: "1.0.0",
      description: "API documentation for Webex Admin Panel",
    },

    // 🔥 IMPORTANT: Dynamic server for Local + Vercel
    servers: [
      {
        url: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:5001",
        description: process.env.VERCEL_URL
          ? "Vercel Server"
          : "Local Development Server",
      },
    ],

    // 🔐 JWT Auth config
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // 👇 Routes where Swagger comments exist
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
