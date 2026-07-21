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
