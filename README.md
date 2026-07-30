# Mini ERP + CRM Operations Portal

A full-stack Mini ERP + CRM web application developed as part of a Full Stack Developer Case Study. The system helps manage customers, products, inventory, authentication, and sales operations using a modern full-stack architecture.

---

# Tech Stack

## Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- React Hook Form

## Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication
- bcrypt

## Database
- PostgreSQL
- Prisma ORM

## Deployment
- Frontend: Vercel
- Backend: Render
- Source Control: GitHub

---

# Features

## Authentication
- JWT Login
- Role-based Authentication
- Admin
- Sales
- Warehouse
- Accounts

## Customer Module
- Add Customer
- Edit Customer
- Search Customer
- Customer Details
- Follow-up Notes

## Product Module
- Add Product
- Edit Product
- Delete Product
- Search Product
- Inventory Status
- Low Stock Alert

## Dashboard
- Total Customers
- Total Products
- Total Challans
- Summary Cards

## Sales Challan
- Create Challan
- Customer Selection
- Product Selection
- Draft & Confirmed Status

---

# Folder Structure

```
MiniERPCRM
│
├── Backend
│   ├── src
│   ├── prisma
│   └── package.json
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/puja1234-sudo/mini-erp-crm.git

cd mini-erp-crm
```

---

# Backend Setup

```bash
cd Backend

npm install
```

Create a `.env` file

```
DATABASE_URL=your_database_url

JWT_SECRET=your_secret_key

PORT=5000
```

Run Prisma

```bash
npx prisma generate

npx prisma migrate dev
```

Start Backend

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Environment Variables

Backend

```
DATABASE_URL=

JWT_SECRET=

PORT=
```

Frontend

Update

```
src/services/api.ts
```

with

```
http://localhost:5000
```

for local development

or

```
https://your-render-url.onrender.com
```

for production.

---

# Database

Database used

- PostgreSQL

ORM

- Prisma

Main Tables

- Users
- Customers
- Products
- Challans

---

# API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile
```

## Customers

```
GET /api/customers

POST /api/customers

PUT /api/customers/:id

DELETE /api/customers/:id
```

## Products

```
GET /api/products

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id
```

## Challans

```
GET /api/challans

POST /api/challans
```

## Dashboard

```
GET /api/dashboard
```

---

# Deployment

Frontend deployed using

- Vercel

Backend deployed using

- Render

---

# Assumptions

- JWT is used for authentication.
- Role-based login is implemented.
- Product SKU is auto-generated.
- Stock cannot be negative.
- Minimum stock alert is displayed.
- PostgreSQL is used as the database.

---

# Known Limitations

- Product image upload is not implemented.
- PDF invoice generation is not implemented.
- Docker setup is not included.
- GitHub Actions CI/CD is not configured.
- Production deployment login routing may require additional configuration, while the application works correctly in the local environment.

---

# GitHub Repository

https://github.com/puja1234-sudo/mini-erp-crm

---

# Author

**Puja Ghosh**

B.Tech, KIIT University

Full Stack Developer | Data Science Enthusiast
