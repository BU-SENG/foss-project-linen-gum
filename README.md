# Aidly <img src="./frontend/public/heart-logo.svg" alt="Aidly Heart Logo" width="40" /> 

**Aidly** is a **web platform** with a frontend developed using React.js and Tailwind CSS and a backend powered by Node.js and Express.js. It aims to simplify the process of connecting people in need with verified helpers or organizations.

---

## ⚙️ Setup Instructions

Follow these steps to run the project locally:

---

### 1. Clone the Repository

```bash
git clone https://github.com/BU-SENG/foss-project-linen-gum.git
```

```bash
cd foss-project-linen-gum
```

---

### 2. Install Dependencies (Frontend & Backend)

The project has two parts — **frontend** and **backend**.

#### 🖥️ Frontend

Navigate to frontend directory

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

---

#### ⚙️ Backend Setup

Navigate to the backend directory from the frontend directory:

```bash
cd ../backend
```

Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

---

### 🌍 Install Nodemon Globally

Nodemon automatically restarts your backend server whenever file changes occur.  
Install it globally using:

```bash
npm install -g nodemon
```

> To verify installation:
>
> ```bash
> nodemon -v
> ```

---

### 3. Create a `.env` File in the root of the backend directory

In your `backend` folder, create a file named `.env` and add the following variable:

```env
PORT=5000
JWT_SECRET=
FLUTTERWAVE_SECRET_KEY=
FRONTEND_URL=
BACKEND_URL=
```

> 💡 You can change the port number if you wish. The server will use the value from this `.env` file.

---

## 4 Database Setup (MongoDB)

You can use **either** use a **local MongoDB** installation or **MongoDB Atlas (cloud)**.
This setup explains using a **local MongoDB** installation

---

### 🧩 Local MongoDB Setup

1. **Install MongoDB Community Edition**

   - Download and install from: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Follow the installation steps for your OS.

2. **(Optional) Install MongoDB Compass**

   - MongoDB Compass is a GUI for viewing your collections and documents.
   - It’s optional and not required to run the backend.

3. **Connect URI**
   - Add the local URI to your `.env` file:

     ```env
     MONGO_LOCAL_URI=mongodb://127.0.0.1:27017/aidly_db
     ```

---


### 5. Configure Email Sending (SMTP)

Add the following to your backend `.env` file:

```env
SMTP_HOST=your_smtp_host      # e.g., smtp.gmail.com
SMTP_PORT=your_smtp_port      # e.g., 465
EMAIL_USER=your_email_address # e.g., aidly@example.com
EMAIL_PASS=your_app_password
EMAIL_NAME=your_email_app_password # NOT your regular email password
```

> Notes:
> - `SMTP_HOST`: your email provider's SMTP server
> - `SMTP_PORT`: usually 587 (TLS) or 465 (SSL)
> - `EMAIL_USER`: the sending email
> - `EMAIL_NAME`: the display name for emails 
> - `EMAIL_PASS`: app password generated from your email provider (for Gmail, go to Google Account > Security > App Passwords)


---

### 6. Run the Project Locally

#### 🖥️ Run Frontend (React + Vite)

Start the app in development mode **(do this while you are in the frontend folder)**:

```bash
npm run dev
```

Then open your browser and visit:

```
http://localhost:5173
```

---

#### ⚙️ Run Backend (Node.js + Express)

**(do this while you are in the backend folder)**:

```bash
npm run dev
```


If everything works correctly, you should see:

```
MongoDB Connected: 127.0.0.1
Server running on http://localhost:5000
```

**(Optional)** Then open your web browser or API testing tool  and visit:

```
http://localhost:5000
```

---

## Project Structure

```
foss-project-linen-gum/
├── frontend/              # React + Vite
│   ├── node_modules/      # Auto-generated after npm install
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/            # Node.js + Express
│   ├── node_modules/   # Auto-generated after npm install
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── mail/
│   │   └── utils/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
|
└── README.md
```

---

## License

This project is licensed under the MIT License — see the [`LICENSE`](./LICENSE) file for details.

---

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/BY41byMO)
