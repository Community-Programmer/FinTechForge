import swaggerJsdoc from 'swagger-jsdoc';
import { config } from 'dotenv';

config();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FinTechForge API',
      version: '1.0.0',
      description: 'Comprehensive API documentation for FinTechForge - A financial education and tools platform',
      contact: {
        name: 'FinTechForge Team',
        email: 'support@fintechforge.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: process.env.BACKEND_URL || 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.fintechforge.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token obtained from login endpoint',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
          description: 'JWT token stored in cookie',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'An error occurred',
            },
            errors: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: ['Validation error details'],
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operation completed successfully',
            },
            data: {
              type: 'object',
              description: 'Response data varies by endpoint',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            isVerified: {
              type: 'boolean',
              example: true,
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              example: 'user',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-01-01T00:00:00.000Z',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              minLength: 6,
              example: 'password123',
            },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              minLength: 6,
              example: 'password123',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
          },
        },
        TokenResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Login successful',
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  $ref: '#/components/schemas/User',
                },
                accessToken: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
                refreshToken: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
              },
            },
          },
        },
        CurrencyConversion: {
          type: 'object',
          properties: {
            from: {
              type: 'string',
              example: 'USD',
            },
            to: {
              type: 'string',
              example: 'EUR',
            },
            amount: {
              type: 'number',
              example: 100.50,
            },
            convertedAmount: {
              type: 'number',
              example: 85.25,
            },
            rate: {
              type: 'number',
              example: 0.85,
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2023-01-01T00:00:00.000Z',
            },
          },
        },
        NewsArticle: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            title: {
              type: 'string',
              example: 'Market Analysis: Tech Stocks Rise',
            },
            summary: {
              type: 'string',
              example: 'Technology stocks showed strong performance...',
            },
            url: {
              type: 'string',
              format: 'uri',
              example: 'https://example.com/news/tech-stocks-rise',
            },
            publishedAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-01-01T00:00:00.000Z',
            },
            source: {
              type: 'string',
              example: 'Financial Times',
            },
          },
        },
        Lesson: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            title: {
              type: 'string',
              example: 'Introduction to Stock Trading',
            },
            description: {
              type: 'string',
              example: 'Learn the basics of stock market trading',
            },
            content: {
              type: 'string',
              example: 'Stock trading involves buying and selling...',
            },
            difficulty: {
              type: 'string',
              enum: ['beginner', 'intermediate', 'advanced'],
              example: 'beginner',
            },
            duration: {
              type: 'number',
              description: 'Duration in minutes',
              example: 30,
            },
            category: {
              type: 'string',
              example: 'Trading',
            },
          },
        },
        Quiz: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            title: {
              type: 'string',
              example: 'Stock Trading Basics Quiz',
            },
            questions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  question: {
                    type: 'string',
                    example: 'What is a stock?',
                  },
                  options: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    example: ['A debt instrument', 'An equity share', 'A bond', 'A commodity'],
                  },
                  correctAnswer: {
                    type: 'number',
                    example: 1,
                  },
                },
              },
            },
            difficulty: {
              type: 'string',
              enum: ['beginner', 'intermediate', 'advanced'],
              example: 'beginner',
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                success: false,
                message: 'Unauthorized access',
                errors: ['Invalid or missing authentication token'],
              },
            },
          },
        },
        ValidationError: {
          description: 'Request validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                success: false,
                message: 'Validation failed',
                errors: ['Email is required', 'Password must be at least 6 characters'],
              },
            },
          },
        },
        NotFoundError: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                success: false,
                message: 'Resource not found',
                errors: ['The requested resource could not be found'],
              },
            },
          },
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                success: false,
                message: 'Internal server error',
                errors: ['An unexpected error occurred'],
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
      {
        cookieAuth: [],
      },
    ],
  },
  apis: [
    './src/auth/*.ts',
    './src/FinanceNews/*.ts',
    './src/CurrecncyConvertor/*.ts',
    './src/FinanceChatbot/*.ts',
    './src/FinanceEducation/*.ts',
  ],
};

export const swaggerSpec = swaggerJsdoc(options);