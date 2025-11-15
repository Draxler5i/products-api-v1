# Product Management System - Backend

A modern, full-featured product management application built with React, TypeScript, and Tailwind CSS. This application provides complete CRUD operations for products with secure authentication and authorization.

## Features
Authentication & Authorization
- User registration with validation
- Secure login system
- JWT token-based authentication
- Protected routes (products accessible only to authenticated users)
- Automatic session management
- Token refresh and error handling

Product Management (CRUD)

- Create: Add new products with name, description, price, and status
- Read: View all products in a responsive grid layout
- Update: Edit existing product information
- Delete: Remove products with confirmation dialog

## Prerequisites
- Node.js (v16 or higher) (version used 20.19.5)
- npm or yarn
- SQL server or docker instance of SQL server

## Installation
1. Create the project
clone project from: https://github.com/Draxler5i/products-api
2. Install dependencies:
```
npm install 
```
3. Create .env file and copy content from .env.example:
```
cp .env.example .env
```
4. Update .env data with your data: 
```
localhost:1433
database
user
password
```
5. Before to start you should run migrations with the followind command:
```
npx prisma generate
npx prisma migrate dev
```
Or you can run the content of __database.sql__ in your database
6. Now run in development mode with:
```
npm run dev
```

This API goes well with the ui from https://github.com/Draxler5i/products-ui