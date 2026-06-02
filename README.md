# Task Manager

A full-stack web application for managing daily tasks and workspace productivity. Built with React, Express, and MongoDB, featuring Google OAuth authentication for seamless login.

## Features

- **User Authentication**: Traditional email/password login and Google OAuth sign-in
- **Task Management**: Create, read, update, and delete tasks
- **Responsive UI**: Modern, intuitive interface for managing daily workload
- **Secure**: JWT token-based authentication and authorization
- **Google OAuth Integration**: Quick and secure sign-in with Google accounts

## Tech Stack

### Frontend

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client with interceptors for auth
- **@react-oauth/google** - Google OAuth integration

### Backend

- **Node.js + Express 5** - Server framework
- **MongoDB + Mongoose** - Database and ODM
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **google-auth-library** - Google token verification
- **CORS** - Cross-origin resource sharing

## Project Structure

```
Task manager/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components (Login, Home, etc.)
│   │   ├── api/           # Axios configuration and API calls
│   │   └── App.jsx        # Main app with routing
│   └── package.json
│
└── server/            # Express backend
    ├── controllers/   # Route handlers
    ├── models/        # MongoDB schemas
    ├── routes/        # API endpoints
    ├── middleware/    # Custom middleware
    ├── db/            # Database connection
    ├── errors/        # Error handling
    └── app.js         # Server entry point
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB instance (local or Atlas)
- Google OAuth credentials (from Google Cloud Console)

### Environment Setup

#### Backend (.env)

Create a `.env` file in the `server` directory:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
```

#### Frontend (.env)

Create a `.env` file in the `frontend` directory (if needed for build configs):

```
VITE_API_URL=http://localhost:5000
```

### Installation

1. **Clone the repository** (if applicable)
2. **Install backend dependencies**:

   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

#### Development Mode

**Terminal 1 - Start the backend server:**

```bash
cd server
npm run dev
```

Server runs on `http://localhost:5000`

**Terminal 2 - Start the frontend dev server:**

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173` (or as shown in terminal)

#### Production Mode

**Build frontend:**

```bash
cd frontend
npm run build
```

**Start backend:**

```bash
cd server
npm start
```

## API Endpoints

### Authentication

- `POST /auth/login` - Login with email and password
- `POST /auth/register` - Register a new account
- `POST /auth/googleLogin` - Authenticate with Google OAuth token

### Tasks

- `GET /tasks` - Fetch all tasks for authenticated user
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Authentication Flow

1. **Traditional Login**: User enters email/password → Backend validates → JWT token issued
2. **Google OAuth**:
   - User clicks "Sign in with Google"
   - Google returns credential token to frontend
   - Frontend sends token to `/auth/googleLogin`
   - Backend verifies token and creates/updates user
   - JWT token issued for future requests

## Key Features Explained

### Token Management

- Tokens are stored in localStorage
- Axios interceptor automatically includes token in all authenticated requests
- 401 responses clear the token and redirect to login

### Route Protection

- Protected routes require valid token in localStorage
- Unauthenticated users are redirected to login
- Token state is synced across browser tabs/windows

### User Models

- **Traditional users**: Email, hashed password
- **Google OAuth users**: Email, Google ID, optional profile picture
- Users can link Google account to existing email-based account

## Troubleshooting

### "Not allowed entry into home page after Google login"

- **Fixed in v1.1**: Token state now properly updates across route changes
- Ensure JWT_SECRET and GOOGLE_CLIENT_ID are set correctly in backend

### Google Login Button Not Appearing

- Verify Google Client ID is correctly configured
- Check browser console for CORS or credential errors

### Database Connection Failed

- Ensure MongoDB is running
- Verify MONGO_URI in .env is correct

### Token Expired

- Tokens expire after 1 day
- Users will be automatically logged out and redirected to login

## Development Notes

- Frontend uses ESLint for code quality
- Backend uses Nodemon for hot-reload during development
- CORS is enabled for local development (frontend on different port)

## Future Enhancements

- Task categories and tags
- Due dates and reminders
- Task sharing and collaboration
- Dark mode support
- Mobile app version

## License

ISC
