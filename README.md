# SprintBoard

A minimal MERN issue tracker for organizing projects and tracking development work.

## Features

- JWT registration and login with bcrypt password hashing
- User-owned project CRUD
- Issue CRUD with status and priority
- Filtering by status, priority, and project; debounced title search
- Dashboard statistics and recent activity log
- Responsive UI with light and dark themes

## Stack

React, React Router, Axios, Node.js, Express, MongoDB, Mongoose, JWT, bcrypt.

## Setup

Requires Node.js and a MongoDB database (for example, MongoDB Atlas).

1. Copy `.env.example` to `server/.env` and fill in the values.
2. Install and run the backend:

   ```sh
   cd server
   npm install
   npm run dev
   ```

3. In another terminal, install and run the frontend:

   ```sh
   cd client
   npm install
   npm run dev
   ```

The API runs at `http://localhost:5000`; Vite prints the frontend URL.

## Environment variables

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Keep real credentials in `server/.env`. Do not commit that file.

## API routes

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/profile`
- Projects: `GET|POST /api/projects`, `GET|PUT|DELETE /api/projects/:id`
- Issues: `GET|POST /api/issues`, `PUT|DELETE /api/issues/:id`
- Dashboard: `GET /api/dashboard/stats`
- Activity: `GET /api/activities`

Project, issue, dashboard, and activity routes require a JWT bearer token where applicable.
