# Employee Registration System (MERN CRUD)

A simple full-stack CRUD app: React frontend + Node/Express backend + MongoDB database.

## Live Deployment

- **Frontend (Netlify):** https://employee-registration-crud.netlify.app/
- **Backend API (Render):** https://employee-crud-backend-hejh.onrender.com
- **Database:** MongoDB Atlas

### Deployment stack
- Frontend hosted on Netlify, built from the `frontend/` directory
- Backend hosted on Render as a Node.js web service, built from the `backend/` directory
- Database hosted on MongoDB Atlas

### Environment variables

**Backend (Render):**
| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `FRONTEND_URL` | Deployed Netlify URL, used to restrict CORS |

**Frontend (Netlify):**
| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Deployed Render backend URL + `/api/employees` |

Note: Render's free tier spins down after inactivity — the first request after idle may take 30-50 seconds to respond while it wakes up.

## Folder structure
```
employee-crud/
  backend/     -> Node.js + Express + Mongoose API
  frontend/    -> React app
```

## Prerequisites
- Node.js installed (v16+ recommended)
- MongoDB installed locally OR a free MongoDB Atlas cluster (cloud)

---

## STEP 1: Set up the Backend

```
cd backend
npm install
```

Create a `.env` file (copy `.env.example` and rename it to `.env`):
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/employeeDB
FRONTEND_URL=
```
If you're using MongoDB Atlas, replace MONGO_URI with your Atlas connection string instead.

Run the backend:
```
npm run dev
```
(uses nodemon so it restarts automatically on changes — or use `npm start` for plain node)

You should see:
```
MongoDB connected successfully
Server running on http://localhost:5000
```

Test it: open http://localhost:5000 in your browser — you should see
"Employee Registration System API is running..."

---

## STEP 2: Set up the Frontend

Open a NEW terminal window (keep backend running):
```
cd frontend
npm install
npm start
```

This opens the app automatically at http://localhost:3000

By default it talks to `http://localhost:5000/api/employees`. To point it at a deployed
backend instead, set `REACT_APP_API_URL` in a `frontend/.env` file (or in your hosting
provider's environment variable settings) to `<your-backend-url>/api/employees`.

---

## STEP 3: Test the CRUD flow

1. Fill the form (Name and Email are required — try leaving them blank to see validation).
2. Click "Add Employee" -> it appears in the table below (Create).
3. Table loads automatically on page load (Read).
4. Click "Edit" on any row -> form fills with that employee's data -> change something -> click "Update Employee" (Update).
5. Click "Delete" on any row -> confirms, then removes it (Delete).
6. Table refreshes automatically after every action — no manual reload needed.

---

## How to test the API directly with Postman (optional, but good for interviews)

Base URL: `http://localhost:5000/api/employees`

| Method | Endpoint              | Body (JSON)                                                                 |
|--------|------------------------|------------------------------------------------------------------------------|
| GET    | /api/employees          | -                                                                             |
| GET    | /api/employees/:id      | -                                                                             |
| POST   | /api/employees          | `{ "name": "John", "email": "john@x.com", "department": "HR", "dateOfJoining": "2024-01-10", "salary": 50000 }` |
| PUT    | /api/employees/:id      | same shape as POST                                                            |
| DELETE | /api/employees/:id      | -                                                                             |

---

## Key concepts this project demonstrates (good to mention in interviews)
- REST API design (GET/POST/PUT/DELETE mapped to CRUD)
- Mongoose schema validation (`required`, `enum`)
- React functional components + hooks (`useState`, `useEffect`)
- Controlled form inputs and client-side validation
- Lifting state up (App.js owns state, passes data/handlers down as props)
- Reusing one form for both Create and Update (conditional logic based on `editingEmployee`)
- Axios for HTTP requests from React to Express
- CORS handling between frontend and backend, restricted via `FRONTEND_URL` in production
- Deploying a MERN app across three separate platforms (Netlify, Render, MongoDB Atlas)
