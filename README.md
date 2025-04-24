# Eatery Cafe - Restaurant Management System

Eatery Cafe is a full-stack Restaurant Management System (RMS) built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It features a user-facing frontend for browsing menus, making reservations, and placing orders, along with an admin dashboard for managing menu items, reservations, and users.

## Features

### ✅ Frontend (React)
- Landing page with sections: Home, About, Menu, Reservation, Contact
- Authentication (User/Admin)
- User dashboard for reservations and orders
- Shopping cart and Stripe payment integration

### ✅ Backend (Node.js + Express)
- RESTful API with JWT authentication
- Cloudinary integration for image uploads
- MongoDB for data storage
- Routes & controllers for:
  - User Authentication
  - Menu Management
  - Orders
  - Reservations

### ✅ Admin Dashboard
- Login for Admin users
- View all users (admins cannot be deleted)
- Add/delete food items (reflected on frontend)
- View/delete reservation requests

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/eatery-cafe.git
cd eatery-cafe
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:
```bash
nodemon index.js
```

### 3. Setup Frontend 
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication

- JWT-based auth for both users and admins.
- Admins are redirected to the admin dashboard.
- Normal users are redirected to the home page.

---

## 💳 Stripe Integration

- Users must register/login to add items to the cart and checkout.
- Stripe is used to securely process payments.

---

## 📦 Dependencies

### Backend:
- express
- mongoose
- jsonwebtoken
- cloudinary
- stripe
- bcrypt 
- cors
- dotenv
- nodemon

### Frontend:
- react
- react-router-dom
- axios 
- react-hook-form
- react-slick
- @stripe/stripe-js
- @material-tailwind/react
- react-hot-toast
- @heroicons/react
- vite
- tailwindcss
- eslint

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.