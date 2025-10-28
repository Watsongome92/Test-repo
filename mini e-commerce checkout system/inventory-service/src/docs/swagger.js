const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Inventory Service API',
            version: '1.0.0',
            description: 'API for managing product inventory',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);
module.exports = specs;