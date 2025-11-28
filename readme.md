This project is made with a purpose to learn TypeScript on backend with NodeJS - Express. It contains basic CRUD APIs.

# TypeScript + Express + Mongoose Backend Guide

This backend uses **TypeScript**, **Express**, **Mongoose**, and **dotenv**.  
Development runs using **ts-node-dev** (auto reload).  
Production uses compiled JavaScript from the **dist/** folder.

This is your complete manual for setup, development, and production deployment.

---

## 1. Install All Required Packages

Run these commands inside your **backend** folder.

### Core packages (runtime)
npm install express mongoose dotenv

### Developer packages (TypeScript + types)
npm install --save-dev typescript ts-node-dev @types/node @types/express @types/mongoose

---

## 2. Create the Project Structure

backend  
├── src  
│   └── server.ts  
├── package.json  
├── tsconfig.json  
└── node_modules  

---

## 3. Configure tsconfig.json

Use this configuration:

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}

---

## 4. Create src/server.ts

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

app.get("/", (req: Request, res: Response) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log("connected on port", port);
});

---

## 5. Add Scripts in package.json

"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}

---

## 6. Development Workflow (Local)

1. Run the development server with automatic reload:
   npm run dev

2. Any TypeScript change will auto-restart the server.

---

## 7. Production Workflow (Deployment)

1. Build the TypeScript code into JavaScript:
   npm run build

2. Run the compiled server:
   npm start

Your server will run from:
dist/server.js

---

## 8. Environment Variables

Create a **.env** file in the backend folder.

Example:

PORT=3030
MONGO_URL=mongodb://localhost:27017/rachel_cake_shop

dotenv automatically loads environment variables when server starts.

---

## 9. Mongoose Database Connection Example

Add this inside server.ts:

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

---

## 10. Summary Cheat Sheet

Install packages  
→ npm install express mongoose dotenv  
→ npm install -D typescript ts-node-dev @types/node @types/express @types/mongoose

Run dev  
→ npm run dev

Build  
→ npm run build

Start production  
→ npm start

Your TypeScript code lives in: src/  
Your compiled JavaScript lives in: dist/

---

## 11. Correct Export / Import Structure (Important for TypeScript)

TypeScript does **not** allow mixing:

- `module.exports = {}`  (CommonJS)
with  
- `import ... from`      (ES Modules)

Mixing them causes:
- Incorrect typings
- Broken Express types (example: res.status becomes Number)
- Default export errors
- Controllers not loading
- ts-node-dev reload issues

To keep everything stable, **always use ES Module syntax**.

and pls use AOS
This README.md contains everything needed to set up, run, and deploy your TypeScript backend.
