# Artify Backend API

## 🌟 Overview

The **Artify Backend API** is a RESTful API built with **Node.js**, **Express**, and **MongoDB**. It powers the **Artify Art Gallery** application, providing endpoints for managing artworks, user favorites, search, filtering, and authentication via Firebase.

---

## 🔗 Base URL

```text
https://artify-gallery-server-side.vercel.app
```

---

## ⚡ Features

- **Authentication**: Firebase token verification for secure access.
- **CRUD Operations**: Create, read, update, and delete artworks.
- **User-Specific Data**: Fetch artworks and favorites based on user email.
- **Search & Filter**: Search artworks by title or filter by category.
- **Likes**: Increment likes for artworks.
- **Latest Data**: Fetch the 6 most recent artworks.

---

## 🔐 Authentication

All protected endpoints require a **Firebase ID token** in the `Authorization` header:
```sh
Authorization: Bearer <Firebase_ID_Token>
```

---

## 📡 Endpoints

### **Artworks (Samples)**

| Method   | Endpoint                          | Description                      | Authentication |
| -------- | --------------------------------- | -------------------------------- | -------------- |
| `GET`    | `/samples`                        | Fetch all artworks               | ❌             |
| `POST`   | `/samples`                        | Add a new artwork                | ✅             |
| `GET`    | `/samples/:id`                    | Fetch a single artwork by ID     | ✅             |
| `PUT`    | `/samples/:id`                    | Update an artwork by ID          | ✅             |
| `DELETE` | `/samples/:id`                    | Delete an artwork by ID          | ✅             |
| `GET`    | `/latest-data`                    | Fetch the 6 most recent artworks | ❌             |
| `GET`    | `/my-artworks?email=<user_email>` | Fetch artworks created by a user | ✅             |
| `PATCH`  | `/samples/:id/like`               | Increment likes for an artwork   | ✅             |

---

### **Favorites**

| Method | Endpoint                           | Description                    | Authentication |
| ------ | ---------------------------------- | ------------------------------ | -------------- |
| `POST` | `/favorites`                       | Add an artwork to favorites    | ✅             |
| `GET`  | `/my-favorites?email=<user_email>` | Fetch all favorites for a user | ✅             |

---

### **Search & Filter**

| Method | Endpoint                        | Description                                 | Authentication |
| ------ | ------------------------------- | ------------------------------------------- | -------------- |
| `GET`  | `/search?search=<query>`        | Search artworks by title (case-insensitive) | ❌             |
| `GET`  | `/category?category=<category>` | Filter artworks by category                 | ❌             |

---

## 📌 Request/Response Examples

### **1. Fetch All Artworks**

**Request:**

```http
GET /samples
```


**Response:**

```json
{
  "success": true,
  "result": [
    {
      "_id": "ObjectId",
      "title": "Artwork Title",
      "category": "Painting",
      "created_by": "user@example.com",
      "likes": 10,
      "date": "2026-06-02T00:00:00Z"
    }
  ]
}
```



### 2. **Add a New Artwork**

**Request:**
```http
POST /samples

Authorization: Bearer <Firebase_ID_Token>
Content-Type: application/json

{
  "title": "New Artwork",
  "category": "Digital",
  "created_by": "user@example.com"
}
```


**Response:**

```json
{
  "success": true,
  "result": {
    "insertedId": "ObjectId"
  }
}
```



### 3. **Like an Artwork**
**Request:**

```http
PATCH /samples/<artwork_id>/like
Authorization: Bearer <Firebase_ID_Token>
```

**Response:**

```json
{
  "success": true,
  "likesCount": {
    "matchedCount": 1,
    "modifiedCount": 1
  }
}
```



### ⚠️ **Error Handling**

- **401 Unauthorized: Missing or invalid Firebase token.*
- **404 Not Found: Resource not found.*
- **500 Internal Server Error: Server-side issues.*

### 🛠️ **Technologies Used**

- **Node.js: Runtime environment.**
- **Express: Web framework.**
- **MongoDB: Database for storing artworks and favorites.**
- **Firebase Admin SDK: Authentication and token verification.**
- **CORS: Enable cross-origin requests.**
- **dotenv: Environment variable management.**

### 📂 **Environment Variables**
Create a .env file in the root directory:
```env
env

PORT=3000
DB_USER=<MongoDB_Username>
DB_PASS=<MongoDB_Password>
```



### 🚀 **Setup & Installation**
**Local Development**

Clone the repository:
```bash

git clone https://github.com/iam-yeasin/artify-art-gallery-server.git

```


Install dependencies:
```bash

npm install express cors mongodb firebase-admin dotenv

```


**Set up Firebase:**

- Download the Firebase service account key (artifyKey.json).
- Place it in the root directory.

**Run the server:**

For development (with auto-restart on changes):
```bash

npm install -g nodemon
nodemon index.js
```


For production:
```bash
node index.js
```




### 📐 **Deployment to Vercel**

- Push your code to a Git repository (GitHub, GitLab, etc.).
- Import the repository in Vercel Dashboard.
- Add environment variables (DB_USER, DB_PASS, and Firebase credentials) in the Vercel project settings.
- Deploy!

### 📜 **License**
**This project is proprietary to :**
```bash
 https://github.com/iam-yeasin
```
