# Amy Travel Agency — Database Management System

> Bangladesh's first all-in-one online travel platform — flights, hotels, tour packages, visa applications, and eSIM plans, powered by a single backend.

---

## Overview

This repository contains the backend and database layer of **Amy Travel Agency**. It handles everything the website needs behind the scenes: storing user and booking data, checking availability, processing payments, and sending notifications.

Built with **Node.js**, **Express**, **PostgreSQL**, and **Prisma ORM**.

---

## Features

### For Customers
- Search and book flights — one-way, return, and multi-city
- Book hotel rooms
- Apply for visas
- Purchase tour packages
- Buy eSIM data plans for international travel

### For Admins
- Manage bookings and process cancellations
- Handle refunds
- Track payments
- Review and process visa applications
- Send notifications to users

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT + bcrypt |
| Environment | dotenv |

---

## Project Structure

```
amy-travel-agency/
│
├── prisma/
│   └── schema.prisma       # All 32 database tables defined here
│
├── src/
│   ├── modules/
│   │   ├── auth/           # Register, login, logout
│   │   ├── flight/         # Flight search and booking
│   │   ├── hotel/          # Hotel search and booking
│   │   ├── tour/           # Tour packages
│   │   ├── visa/           # Visa applications
│   │   └── payment/        # Payment processing
│   │
│   └── middleware/
│       ├── auth.js         # Verifies JWT tokens
│       └── rbac.js         # Role-based access (admin / customer)
│
├── .env.example            # Environment variable template
├── package.json            # Project dependencies
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fahim15hub/Travel-Agency-Database-Management-System.git
   cd Travel-Agency-Database-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and fill in your database URL, JWT secret, and any other required values.

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

---

## Environment Variables

Create a `.env` file based on `.env.example`. Key variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/amy_travel
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

---

## Database

The schema is defined in `prisma/schema.prisma` and covers **32 tables**, including:

- Users & authentication
- Flights, schedules, and seats
- Hotels and room types
- Tour packages and itineraries
- Visa applications and statuses
- eSIM plans
- Bookings, payments, and refunds
- Notifications and audit logs

---

## API Modules

| Module | Base Route | Description |
|---|---|---|
| Auth | `/api/auth` | Register, login, logout, token refresh |
| Flight | `/api/flights` | Search, book, and manage flights |
| Hotel | `/api/hotels` | Search, book, and manage hotels |
| Tour | `/api/tours` | Browse and book tour packages |
| Visa | `/api/visa` | Submit and track visa applications |
| Payment | `/api/payments` | Process payments and refunds |

---

## Project Status

| Module | Status |
|---|---|
| Auth | ✅ Complete |
| Flight | 🔄 In Progress |
| Hotel | ⏳ Planned |
| Tour | ⏳ Planned |
| Visa | ⏳ Planned |
| Payment | ⏳ Planned |

---

## Contributing

This is a university project. Contributions are not open at this time.

---

## License

This project is for academic purposes at **IIUC (International Islamic University Chittagong)**.
