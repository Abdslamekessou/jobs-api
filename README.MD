# 🧾 Jobs API

A RESTful API built with Node.js, Express, and MongoDB that allows users to register, log in, and manage job applications (CRUD functionality).

## 🚀 Features

- ✅ User Authentication (Register & Login)
- 🔐 Protected Routes with JWT
- 📦 CRUD operations for Job listings
- 🧰 Error handling & custom middleware
- 🔒 Secured with Helmet, XSS-clean, Rate Limiting, and Mongo Sanitize
- ☁️ MongoDB Atlas for cloud database

---

## 📁 Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- dotenv
- bcrypt
- express-rate-limit
- helmet
- xss-clean
- express-mongo-sanitize

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/jobs-api.git
cd jobs-api
npm install
```

⚙️ Environment Variables
Create a .env file in the root and add the following:
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=1d
PORT=5000
```

🧪 Run Locally

```
npm start
```

📮 API Endpoints

🔑 Auth
```
POST /api/v1/auth/register → Register user

POST /api/v1/auth/login → Login user (returns token)
```

📄 Jobs (Protected)
````
Include Authorization: Bearer <token> in headers.

GET /api/v1/jobs → Get all jobs

GET /api/v1/jobs/:id → Get single job

POST /api/v1/jobs → Create new job

PATCH /api/v1/jobs/:id → Update job

DELETE /api/v1/jobs/:id → Delete job
```

🛡 Security Middleware
```
helmet - Sets secure HTTP headers

xss-clean - Cleans user input from malicious scripts

express-rate-limit - Limits repeated requests

express-mongo-sanitize - Prevents NoSQL injection
```

🐳 Deployment
Deployed on Render :
```
https://jobs-api-s96n.onrender.com
```

🙋‍♂️ Author
Abdessalem Kessouri
Project built during learning with John Smilga’s Node.js course on freeCodeCamp.



