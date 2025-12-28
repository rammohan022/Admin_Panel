const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Webex Admin Panel API',
      version: '1.0.0',
      description: 'API documentation for Webex Admin Panel',
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Local server',
      },
      {
        url: 'https://admin-panel-mu-neon.vercel.app',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Use absolute path for Vercel compatibility
  apis: [path.join(__dirname, '../routes/*.js')], 
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
