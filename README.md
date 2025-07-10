# 🛠Project Management Tool – Backend

This is the **backend API** for a full-featured project management application built with **Node.js**, **Express.js**, and **MongoDB**. It supports user authentication, project and task management, and includes a seeder to quickly populate the database with sample data.

---

## 📦 Tech Stack

* **Node.js + Express.js** – RESTful API
* **MongoDB + Mongoose** – Database
* **JWT** – Authentication
* **bcrypt.js** – Password hashing
* **dotenv** – Environment variables
* **Seeder** – For test data setup

---

## 📁 Folder Structure

```
backend/
├── src/
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routers
│   ├── middlewares/        # Auth, error handling, etc.
│   ├── config/             # Status enums
├── seed.js                 # Seeder script
├── app.js               # Entry point
├── .env                    # Environment config
├── .gitignore
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Sanngeeta/Project-Management-App.git
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
npm start
```

> API will run at: `http://localhost:5000/api`

---

## 🌱 Run Seeder (Insert Dummy Data)

This script creates:

* ✅ 1 user: `test@example.com` / `Test@123`
* ✅ 2 projects linked to this user
* ✅ Each project has 3 tasks

### Command:

```bash
node seed.js
```

---

## 🔐 Test User Credentials

```
Email: test@example.com
Password: Test@123
```

---

## 🚀 Features

### 1. Authentication

* Register & Login with email and password
* Passwords hashed with bcrypt
* JWT token authentication middleware

### 2. Project Management

* CRUD operations
* Fields: `title`, `description`, `status (Active | Completed)`
* Only show logged-in user's projects

### 3. Task Management

* CRUD operations on tasks
* Fields: `title`, `description`, `status (Todo | In-progress | Done)`, `dueDate`
* Tasks linked to specific projects and users
* Filter tasks by status

### 4. Seeder

* Easily populate DB with one user, projects, and tasks using `seed.js`

---


## 📂 Status Config (Enums)

```js
// src/config/status.js
projectStatus = {
  ACTIVE: "Active",
  COMPLETED: "Completed",
};

taskStatus = {
  TODO: "Todo",
  IN_PROGRESS: "In-progress",
  DONE: "Done",
};
```

---

## ⚠️ Known Limitations

* No pagination on task endpoints
* No email verification
* No password reset or OTP
* No role-based access (admin/user)

---
