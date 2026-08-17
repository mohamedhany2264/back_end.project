# Products API

Same structure/approach as the original courses project, just a different domain (store products instead of courses). Data is still read from/written to a local JSON file — `models/product-model.js` is left empty on purpose, same stage as the original `course-model.js`.

## Setup

1. `npm install`
2. Open `.env` and fill in your real MongoDB connection string:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/?appName=<app-name>
   DB_NAME=PRODUCTS_DB
   ```
   You can reuse the same Atlas cluster you already use for the courses project — just keep `DB_NAME` different (e.g. `PRODUCTS_DB`) so the data doesn't mix.
3. `npm start` (runs on `nodemon`, restarts on file changes)

## Endpoints

Base URL: `/api/v1/products`

| Method | Path              | Description        |
|--------|-------------------|---------------------|
| GET    | `/`               | Get all products    |
| POST   | `/`               | Create a product    |
| GET    | `/:id`            | Get one product     |
| PATCH  | `/:id`            | Update a product    |
| DELETE | `/:id`            | Delete a product    |

## Project structure

```
products-api/
├── index.js
├── config/db-connect.js
├── routes/product-routes.js
├── controllers/product.controllers.js
├── models/product-model.js      (empty stub, not wired in yet)
└── data/products-data.json      (seed data, read/written by the controller)
```
