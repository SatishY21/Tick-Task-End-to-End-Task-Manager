# 📌 Tick Task - A Full-Stack To-Do List Application

![Tick Task Screenshot](https://i.imgur.com/uG9gV95.png)

A modern, full-stack task manager built from the ground up. Tick Task allows users to securely register, log in, and manage their personal to-do lists. This project demonstrates a complete development cycle, from local setup to full-stack deployment on the web.

---

## ✨ Features

- **User Authentication**: Secure user registration and login system with password hashing (`bcrypt.js`).
- **Personalized To-Do Lists**: Each user has their own private list of tasks stored in the database.
- **CRUD Functionality**: Full Create, Read, Update, and Delete capabilities for tasks.
  - **Add Tasks**: Quickly add new tasks through a simple form.
  - **Mark as Complete**: Toggle the completion status of any task with a checkbox.
  - **Delete Tasks**: Remove tasks that are no longer needed.
- **Responsive UI**: A beautiful, clean, and responsive user interface built with **React** and styled with **Tailwind CSS**.
- **RESTful API**: A robust backend API built with **Node.js** and **Express** to handle all data operations.
- **Cloud Database**: User and task data is securely stored in a **MongoDB Atlas** cloud database.
- **Live Deployment**: The application is fully hosted online using a modern decoupled architecture:
  - Frontend deployed on **Vercel**.
  - Backend deployed on **Render**.

---

## 🛠️ Tech Stack

This project utilizes a modern MERN-like stack:

- **Frontend**:
  - [React](https://reactjs.org/) (with Vite)
  - [React Router](https://reactrouter.com/) for page navigation
  - [Tailwind CSS](https://tailwindcss.com/) for styling
- **Backend**:
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/) for the API framework
  - [Mongoose](https://mongoosejs.com/) for database object modeling
  - [bcrypt.js](https://www.npmjs.com/package/bcryptjs) for password hashing
  - [dotenv](https://www.npmjs.com/package/dotenv) for environment variable management
- **Database**:
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud Database)

---

## 🚀 Getting Started Locally

To run this project on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account

### 1. Clone the Repository

```bash
git clone [https://github.com/SatishY21/Tick-Task-End-to-End-Task-Manager.git](https://github.com/SatishY21/Tick-Task-End-to-End-Task-Manager.git)
cd Tick-Task-End-to-End-Task-Manager

🌐 Deployment
This project is deployed using a decoupled architecture for optimal performance and scalability.

Frontend: The React application is hosted on Vercel, providing a fast global CDN for static assets.

Backend: The Node.js API is hosted as a Web Service on Render, which automatically sleeps on inactivity to stay within the free tier.

Database: MongoDB Atlas serves as the cloud database, accessible from the hosted backend.

This setup ensures a professional, scalable, and cost-effective hosting solution.
