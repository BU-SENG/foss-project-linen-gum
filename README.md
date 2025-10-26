# 💕 Aidly

**Aidly** is a **web platform** that is being built with React.js and Tailwind CSS on the frontend and Node.js and Express.Js on the backend. It aims to simplify the process of connecting people in need with verified helpers or organizations. 

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

### ⚙️ Backend Setup

Navigate to the backend directory from the frontend:

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
```

> 💡 You can change the port number if you wish. The server will use the value from this `.env` file.

---


###  4. Run the Project Locally

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


**(Optional)** Then open your web browser or API tool (e.g., Postman) and visit:

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
│   │   └── utils/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env   
|   
└── README.md
```

---

## Database Setup (Coming Soon)

> ⚙️ **Note:** The backend currently runs without a database connection.  
> You only need to create a `.env` file and set your preferred port (e.g., `PORT=5000`).  
> Database setup instructions for MongoDB will be added soon.


## License

This project is licensed under the MIT License — see the [`LICENSE`](./LICENSE) file for details.

---


[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/BY41byMO)
