# Life Compass Backend

A personal growth and learning platform backend built with Express, TypeScript, and MongoDB.

## Features

- **User Management**: Authentication, profiles, and preferences
- **Learning Paths**: Custom learning journeys with progress tracking
- **Content Management**: Articles, videos, and resources
- **Goal Tracking**: Personal goals with milestones and achievements
- **Reflection System**: Daily reflections and insights
- **Progress Analytics**: Track learning and personal growth metrics

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT
- **Validation**: express-validator

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and configure your environment variables:
```bash
cp .env.example .env
```

4. Start MongoDB locally or use a cloud instance

5. Run in development mode:
```bash
npm run dev
```

6. Build for production:
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── config/          # Configuration files
├── models/          # Mongoose models
├── controllers/     # Route controllers
├── services/        # Business logic
├── middlewares/     # Custom middleware
├── routes/          # API routes
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
└── server.ts        # Application entry point
```

## API Documentation

API documentation will be available at `/api/v1/docs` when running the server.

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Lint code
- `npm test` - Run tests

## License

ISC
