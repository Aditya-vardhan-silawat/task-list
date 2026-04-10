# Task Manager App

A simple full-stack Task Manager application built with React (Vite) and Node.js (Express).

## Features

- View all tasks
- Add new tasks
- Mark tasks as completed/pending
- Delete tasks
- Filter tasks (All, Pending, Completed)
- Persistent storage using a JSON file on the backend
- Simple and clean UI

## Tech Stack

- **Frontend:** React (Vite), Axios, Plain CSS
- **Backend:** Node.js, Express, fs-extra (for JSON file storage)

## Setup Instructions

### Prerequisites
- Node.js installed on your machine

### 1. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:5001`.

### 2. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at the URL shown in your terminal (usually `http://localhost:5173`).

## API Endpoints

- `GET /tasks` - Get all tasks
- `POST /tasks` - Add a new task (body: `{ "title": "string" }`)
- `PATCH /tasks/:id` - Update task completion (body: `{ "completed": boolean }`)
- `DELETE /tasks/:id` - Delete a task

## Assumptions & Notes
- The app uses `Date.now()` for simple ID generation.
- Tasks are stored in `server/tasks.json`.
- Minimal styling is used to keep the project clean and readable.
