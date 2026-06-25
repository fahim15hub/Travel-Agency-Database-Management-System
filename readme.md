##Amy Travel Agency — Database Management System
A website where people in Bangladesh can book flights, hotels, tour packages, visa applications, and eSIM plans — all in one place.

##What is this project?

This is the backend and database of Amy Travel Agency. 
Think of it like the engine behind the website —
it stores all the data (users, bookings, payments) and handles all the logic (checking availability, processing payments, sending notifications).

#What users can do:
Search and book flights (one-way, return, multi-city).
Book hotel rooms.
Apply for visas.
Buy tour packages.
Purchase eSIM data plans for travel.

#What admins can do:
Manage bookings and cancellations.
Process refunds.
Track payments.
Handle visa applications.
Send notifications to users.

#Project Folder Structure:

amy-travel-agency/

│
├── prisma/
│   └── schema.prisma       ← All 32 database tables are defined here
│
├── src/
│   ├── modules/
│   │   ├── auth/           ← Login, register, logout
│   │   ├── flight/         ← Flight search and booking
│   │   ├── hotel/          ← Hotel search and booking
│   │   ├── tour/           ← Tour packages
│   │   ├── visa/           ← Visa applications
│   │   └── payment/        ← Payment processing
│   │
│   └── middleware/
│       ├── auth.js         ← Checks if user is logged in
│       └── rbac.js         ← Checks what role the user has (admin/customer)
│
├── .env.example            ← Template for your .env file
├── package.json            ← List of all dependencies
└── README.md               ← This file