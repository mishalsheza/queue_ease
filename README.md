QueueEase 📋
Effortless Queue Management for Clinics, Colleges, Banks & More

🎯 Overview
QueueEase is a modern, user-friendly queue management system built with React Native and Expo. It simplifies the queueing experience for various service providers including clinics, colleges, banks, government offices, and retail stores.

✨ Features
🎫 User Features
Real-time Queue Tracking: View your position and estimated wait time

Digital Tokens: Get a digital token instead of physical slips

Active Ticket Display: Clean interface showing current status

Live Updates: Refresh to get real-time queue information

Easy Cancellation: Cancel your ticket with one tap

Counter Notifications: See which counter is currently serving

🛠️ Admin Features
Queue Management: Create and manage multiple service queues

Real-time Monitoring: Track all active queues and waiting users

Token System: Generate and manage tokens

Analytics Dashboard: View queue statistics and performance metrics

Counter Assignment: Assign tokens to specific service counters



🚀 Getting Started
Prerequisites
Node.js (v18 or higher)

npm or yarn

Expo CLI

iOS Simulator (for Mac) or Android Studio (for Android)

Installation
Clone the repository

bash
git clone https://github.com/mishalsheza/queue_ease
cd queueease
Install dependencies

bash
npm install
# or
yarn install
Set up environment variables
Create a .env file in the root directory:

env
EXPO_PUBLIC_API_URL=your_api_url_here
EXPO_PUBLIC_APP_NAME=QueueEase
Start the development server

bash
npx expo start
Run on your device

Press a for Android
Press i for iOS

Scan QR code with Expo Go app (for physical devices)

🏗️ Project Structure
text
queueease/
├── app/
│   ├── (tabs)/           # Main tab navigation
│   │   ├── dashboard.tsx # User dashboard
│   │   ├── join-queue.tsx # Join queue screen
│   │   └── history.tsx   # Queue history
│   ├── (admin)/          # Admin routes
│   │   ├── login.tsx     # Admin login
│   │   └── dashboard.tsx # Admin dashboard
│   └── _layout.tsx       # Root layout
├── components/           # Reusable components
├── lib/                  # Utilities and configurations
│   └── api.ts           # API configuration
├── assets/              # Images, fonts, etc.
└── constants/           # Constants and configs
🔧 Tech Stack
Frontend: React Native, Expo

Navigation: Expo Router

Styling: React Native StyleSheet

UI Components: @expo/vector-icons, expo-linear-gradient

State Management: React Hooks (useState, useEffect)

HTTP Client: Axios

Development: TypeScript

📋 API Integration
QueueEase connects to a backend API for:

User authentication and queue management

Real-time queue updates

Admin dashboard operations

Historical data and analytics

API Endpoints
GET /queues - Get all active queues

POST /queues/join - Join a queue

GET /my-ticket - Get user's active ticket

DELETE /ticket/cancel - Cancel ticket

GET /admin/queues - Admin: Get all queues

POST /admin/queues - Admin: Create new queue

🎨 Design System
Colors
Primary: #667eea (Purple Blue)

Secondary: #764ba2 (Purple)

Success: #4CAF50 (Green)

Error: #FF5252 (Red)

Background: #f5f5f5 (Light Gray)

Typography
Primary Font: System default

Headers: Bold, larger sizes

Body: Regular, readable sizes

Labels: Smaller, semi-bold

Web: Progressive Web App ready
