# 🧠 Neurovia AI — Intelligent Chat Platform

Neurovia AI is a full-stack AI-powered chat application inspired by modern conversational platforms like Perplexity and ChatGPT. It provides real-time AI interactions, authentication with email verification, and persistent chat history — built with a production-ready architecture.

---

## 🌐 Live Demo

🔗 Frontend: https://neurovia-ai-ten.vercel.app  
🔗 Backend API: https://neurovia-ai-evzk.onrender.com

---

## ✨ Features

### 🔐 Authentication System

- User registration & login with secure JWT authentication
- Email verification system (Resend integration)
- HTTP-only cookie-based auth (secure sessions)
- Protected routes & middleware

### 💬 AI Chat System

- Real-time chat functionality
- Persistent chat history per user
- Socket.IO integration for live communication
- Dynamic chat creation with titles

### ⚡ AI Integration

- Gemini API (Google Generative AI)
- Mistral AI support
- Tavily search integration (RAG-style responses)

### 🎨 Frontend Experience

- Built with React + Vite
- Tailwind CSS for modern UI
- Loading states & error handling
- Clean, responsive, and minimal UI

### 📩 Email System

- Professional email templates
- Email verification flow using Resend
- Token-based verification with expiry

---

## 🏗️ Tech Stack

### Frontend

- React.js (Vite)
- Tailwind CSS
- Redux Toolkit
- Axios

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.IO

### Services & APIs

- Resend (Email Service)
- Google Gemini API
- Mistral AI
- Tavily API

---

## 📂 Project Structure

Neurovia-AI/
│
├── Backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── services/
│ ├── config/
│ └── server.js
│
├── Frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ ├── redux/
│ └── main.jsx
│
└── README.md

---

## 🔑 Environment Variables

### Backend (.env)

PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

RESEND_API_KEY=your_resend_key

CLIENT_URL=https://your-frontend-url

BASE_URL=https://your-backend-url

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/neurovia-ai.git
cd neurovia-ai
2️⃣ Backend Setup
cd Backend
npm install
npm run dev
3️⃣ Frontend Setup
cd Frontend
npm install
npm run dev
🔐 Authentication Flow
User registers
Verification email is sent
User clicks verification link
Account is activated (verified = true)
Login allowed
📡 API Endpoints
Auth Routes
POST /api/auth/register
POST /api/auth/login
GET /api/auth/get-me
GET /api/auth/verify-email
POST /api/auth/logout
Chat Routes
GET /api/chats
POST /api/chats/message
GET /api/chats/:id/messages
DELETE /api/chats/delete/:id
🚀 Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
🧠 Key Highlights
Production-ready authentication system
Secure cookie-based auth with CORS handling
Email verification with fallback handling
Real-time communication using WebSockets
Scalable backend architecture
Clean and maintainable code structure
📌 Future Improvements
Resend verification email feature
OTP-based verification system
Chat streaming (real-time AI responses)
User profile & settings
Rate limiting & security enhancements
👨‍💻 Author

Nayan Bhusari
Frontend Developer | Full Stack Enthusiast

⭐ Show your support

If you like this project, consider giving it a ⭐ on GitHub!
```
