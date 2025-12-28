const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Webex Admin Panel API",
      version: "1.0.0",
      description: "API documentation for Webex Admin Panel",
    },

    servers: [
      {
        url: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:5000",
        description: process.env.VERCEL_URL
          ? "Vercel Server"
          : "Local Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [{ bearerAuth: [] }],
  },

  // Use absolute paths for Vercel
  apis: [
    path.resolve(__dirname, "../routes/*.js"),
    path.resolve(process.cwd(), "routes/*.js"),
  ],
};

console.log("Swagger APIs paths:", options.apis);

module.exports = swaggerJsDoc(options);
