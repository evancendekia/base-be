# Backend API (Node.js + Express + Prisma)

This project is the backend API responsible for authentication, subscription validation, user preferences, and secure content access.

---

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt (password hashing)
- Postmark (email service)
- Railway (deployment)

---

## Setup Instructions

### Prerequisites

Install:

- Node.js (v22 or later)
- PostgreSQL

---

### 1. Clone Repository

```bash
git clone https://github.com/evancendekia/base-be.git
cd base-be
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create `.env` file:

```env
APP_ENV=local
DATABASE_URL={SECRET}
POSTMARK_API_KEY={SECRET}
EMAIL_FROM={SECRET}
STRAPI_URL=http://localhost:1337/api
STRAPI_TOKEN={SECRET}

```

---

### 4. Run Database Migration

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

---

### 5. Start Backend Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## Production Deployment

Backend URL:

https://assignment-be.evancendekia.com
