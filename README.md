# Job Listing Application

A full-stack application built with React and Express that allows users to browse, search, and filter job postings.

## Features

- Search and filter jobs by keywords, location, and more
- View detailed information about each job posting
- RESTful API for job data

## Tech Stack

### Frontend
- React (with Vite)
- TypeScript
- Tailwind

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- RESTful API

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobCard.tsx
│   │   │   ├── JobDetails.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── ...
│   │   ├── types/
│   │   │   └── job.types.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── backend/
    ├── controllers/
    │   └── jobController.js
    ├── models/
    │   └── Job.js
    ├── routes/
    │   └── jobs.js
    ├── server.js
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation & Setup

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/job-listing-app.git
cd job-listing-app
```

#### 2. Backend Setup

```bash
cd backend
npm install
```


```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

#### 3. Frontend Setup

```bash
cd ../frontend
npm install

```
#### 3. Install the libraries mentioned in package.json for frontend and backend

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:5000/api/jobs
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/jobs | Get all jobs & with location filter |
| GET    | /api/jobs/:id | Get a specific job by ID |

