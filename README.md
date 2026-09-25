# Real-Time Chat Application

Full-stack real-time chat application built with React, TypeScript, Node.js, Express, MongoDB and Socket.IO.

The project focuses on building an end-to-end backend architecture for authentication, messaging, real-time communication, validation, error handling, and frontend-backend integration.

## ✨ Features

🔐 JWT based authentication
🍪 Authentication with HTTP cookies
💬 Real-time messaging with Socket.IO
🟢 Tracking online users
👥 Validating chat participants
🛡️ Secured API routes
✅ Request validation with Zod
⚠️ Centralized error handling
🔄 RESTful API architecture
🗄️ MongoDB database
⚛️ React + TypeScript frontend
📦 Zustand used for client-side state management
🔌 Axios based API communication
🎨 Tailwind CSS and shadcn/ui
🔄 Sockect event handling via reusable React hooks

## 🏗️ Architecture

The application is split to two main parts:

```text
real-time-chat-app/
│
├── BackEnd/
│  ├── src/
│  │  ├── controllers/
│  │  ├── services/
│  │  ├── routes/
│  │  ├── middlewares/
│  │  ├── validators/
│  │  └── ...
│  └── ...
│
├── FrontEnd/
│  ├── src/
│  │  ├── components/
│  │  ├── hooks/
│  │  ├── lib/
│  │  ├── types/
│  │  └── ...
│  └── ...
│
└── README.md
```

### Backend

The backend exposes REST API and real-time communication.
It has several responsibilities like:

User authentication
User management
Chat and message operations
Request validation
Authentication middleware
Error handling
Socket.IO communication
Online users management
MongoDB database access

### Frontend

The frontend exposes the user-interface and communicates with the backend using REST API and Socket.IO.
It's primary technologies are:

React
TypeScript
Zustand
Axios
Tailwind CSS
shadcn/ui

## 🔄 Real-Time Communication

Socket.IO is used to enable real-time communication between connected users.

The flow can be approximately represented as:

```text
User
│
▼

React Frontend
│

├── REST API ──────────► Express Backend
│              │
│              ▼
│            MongoDB
│
└── Socket.IO ─────────► Socket Server
│
▼
Other Users
```
The application uses authenticated socket connections and tracks connected users.
## 🔐 Authentication
Authentication is done using JWT.
The flow is generally:
```text
Login
│
▼
Backend validates credentials
│
▼
JWT generated
│
▼
JWT stored in HTTP cookie
│
▼
Authenticated API / Socket.IO requests
```
The protected routes verify the user's authentication before allowing them access to protected resources.
## 🧰 Tech Stack
### Frontend
React
TypeScript
Vite
Tailwind CSS
shadcn/ui
Zustand
Axios
### Backend
Node.js
Express.js
TypeScript
Socket.IO
Zod
JWT
### Database
MongoDB
Mongoose

### Development
Git
npm
Nodemon
ts-node
## 🚀 Getting Started
### Prerequisites
Make sure you have installed:
Node.js
npm
MongoDB
### 1. Clone the repository
```bash

git clone https://github.com/mohamed-yaser1/real-time-chat-app.git
cd real-time-chat-app
```
### 2. Install backend dependencies
```bash
cd BackEnd
npm install
```
### 3. Configure backend environment variables
Create a .env file inside the BackEnd directory (environment variables used by the backend):
Example:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Make sure to replace the values with your environment variable names, if they differ from the example above.
### 4. Start the backend
```bash
npm run dev
```
### 5. Install frontend dependencies
Open another terminal:
```bash
cd FrontEnd
npm install
```
### 6. Start the frontend
```bash
npm run dev
```
The frontend will then be served with the help of Vite development server.
## 📚 What I Practiced
This was a hands-on backend-focused project to practice:
REST API design
Authentication and authorization
JWT and cookies
WebSockets and Socket.IO
Real-time application architecture
MongoDB and Mongoose
Request validation
Error handling
TypeScript backend development
React and backend integration
Client-side state management
Git and incremental development
## 🛣️ Future Improvements
Some potential future improvements:
Message read receipts
Typing indicators
Message pagination
File and image sharing
Push notifications
Redis for distributed socket management
Automated testing
Dockerized development environment
CI/CD pipeline
## 👨‍💻 Author
Mohamed Yaser Elmetwally
Computer Science Student & Backend-Focused Full-Stack Developer
GitHub: mohamed-yaser1