# 📦 ProFast - Smart Parcel Delivery Solution

ProFast is a full-stack parcel delivery web application designed to offer efficient, real-time, and reliable delivery management. Built with modern web technologies, ProFast simplifies the process of sending, tracking, and managing parcels — for admins, riders, and customers alike.

---

## 🚀 Live Site

🌐 [Visit ProFast Live](https://pro-fast-c5244.web.app)

---

## ✨ Core Features

### 🔐 Authentication & Authorization
- Firebase Authentication (Email/Password)
- JWT secured API access
- Role-based access (Admin, Rider, User)

### 📦 Parcel Management
- Send parcels via an intuitive form
- Real-time parcel status updates: `pending`, `assigned`, `in-transit`, `delivered`
- Delivery cost calculation based on region and center
- Assign Rider modal based on parcel location

### 🧭 Tracking System
- Track parcels by unique ID
- Parcel tracking logs stored in database
- User-friendly tracking page with real-time status

### 🛵 Rider Dashboard
- Rider parcel list (assigned, in-transit)
- Mark parcel as picked or delivered
- Weekly/monthly earnings summary
- Cashout feature for riders

### 🧑‍💼 Admin Dashboard
- Manage users and riders
- Approve/Cancel pending rider requests
- View all parcels and assign riders
- Monitor earnings and cashouts

### 💳 Payments
- Stripe integration for secure online payments
- Payment intent creation and tracking
- Payment history for users and admins

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS + DaisyUI
- Axios + React Query
- Firebase Auth

### Backend
- Node.js + Express.js
- MongoDB (with Mongoose)
- Firebase Admin SDK (JWT verification)
- Stripe API for payments

---

## 📁 Folder Structure Highlights

