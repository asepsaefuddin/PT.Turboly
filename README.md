# TaskFlow – Task Management Web Application

TaskFlow is a full-stack task management web application built to fulfill the coding challenge requirements.

This application allows users to authenticate, manage tasks, track deadlines, organize priorities, and receive alerts for tasks due today.

---

## Project Information

- Challenge Duration: May 19–21, 2026
- Type: Full Stack Web Application
- Repository Owner: Asep Saefuddin

---

## Tech Stack

### Frontend
- React JS (Vite)
- Tailwind CSS
- DaisyUI
- React Router DOM
- Axios

### Backend
- Express JS
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## Features

### Authentication
- User Register
- User Login
- User Logout
- Protected Routes
- Automatic logout when token becomes invalid

### Task Management
- Create Task
- View Task List
- Update Task Status
- Delete Task
- Complete / Incomplete Task

### Task Organization
- Sort by:
  - Due Date
  - Title
  - Priority
  - Newest

### Notifications
- Due Today Alert

### UI / UX
- Modern Dashboard UI
- Adaptive Layout
- Mobile Friendly
- Tablet Friendly
- Desktop Friendly

---

# Requirement Coverage

| Requirement | Status |
|---|---|
| Login and Logout | ✅ |
| Enter tasks | ✅ |
| Due dates | ✅ |
| Priority management | ✅ |
| View previous tasks | ✅ |
| Mark completed | ✅ |
| Sort task list | ✅ |
| Alert for today's tasks | ✅ |
| Mobile UI | ✅ |
| Tablet UI | ✅ |
| Desktop UI | ✅ |

---


# Installation

## Clone Repository

```bash
git clone https://github.com/asepsaefuddin/PT.Turboly.git
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=3000

MONGO_URI=YOUR_MONGO_URI

JWT_SECRET=YOUR_SECRET
```

Run:

```bash
npm run dev
```

Backend:

```plaintext
http://localhost:3000
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Run:

```bash
npm run dev
```

Frontend:

```plaintext
http://localhost:5173
```

---

# API Endpoints

## Auth

```http
POST /auth/register
POST /auth/login
```

---

## Tasks

```http
GET /tasks

GET /tasks/today

GET /tasks/:id

POST /tasks

PATCH /tasks/:id

DELETE /tasks/:id
```

---

# Screenshots

## Login

Insert screenshot here

---

## Dashboard

Insert screenshot here

---

## Task Completed

Insert screenshot here

---

# Security

- JWT Authentication
- Protected API Routes
- Password Hashing
- Token Validation
- Environment Variables

---

# Notes

This project was developed as part of a coding challenge submission.

Daily commits were used to demonstrate development progress throughout the challenge period.

Thank you for reviewing this submission.