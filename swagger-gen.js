const swaggerJsDoc = require("swagger-jsdoc");
const fs = require("fs");
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
          : "http://localhost:5001",
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
  apis: [path.join(__dirname, "./routes/*.js")], // Path to routes
};

const swaggerSpec = swaggerJsDoc(options);

fs.writeFileSync(
  path.join(__dirname, "swagger.json"),
  JSON.stringify(swaggerSpec, null, 2)
);

console.log("Swagger JSON generated successfully!");
