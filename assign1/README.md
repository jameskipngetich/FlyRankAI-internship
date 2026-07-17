# Task Manager REST API

A simple REST API built with **Node.js** and **Express.js** for managing tasks. The API stores tasks in memory and supports the basic CRUD (Create, Read, Update, Delete) operations.

## Features

* View API information
* Health check endpoint
* List all tasks
* Retrieve a task by ID
* Create a new task
* Update an existing task
* Delete a task
* Interactive API documentation using Swagger UI

## Technologies Used

* Node.js
* Express.js
* Swagger UI Express
* Swagger JSDoc

## Installation

1. Clone the repository.

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies.

```bash
npm install
```

3. Start the server.

```bash
node task_manager.js
```

The API will be available at:

```
http://localhost:8080
```

## API Documentation

Swagger UI provides interactive documentation for testing the API directly from your browser.

Open:

```
http://localhost:8080/api-docs
```

## API Endpoints

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/`          | API information         |
| GET    | `/health`    | Health check            |
| GET    | `/tasks`     | Retrieve all tasks      |
| GET    | `/tasks/:id` | Retrieve a task by ID   |
| POST   | `/tasks`     | Create a new task       |
| PUT    | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task           |

## Example Task Object

```json
{
  "id": 1,
  "name": "Security audit",
  "description": "Go through overnight security logs",
  "done": false
}
```

## Example Request

Create a task:

```http
POST /tasks
Content-Type: application/json
```

```json
{
  "name": "Finish assignment",
  "description": "Complete the REST API project"
}
```

Example response:

```json
{
  "id": 4,
  "name": "Finish assignment",
  "description": "Complete the REST API project",
  "done": false
}
```

## Response Codes

| Status Code | Meaning                        |
| ----------- | ------------------------------ |
| 200         | Request completed successfully |
| 201         | Resource created successfully  |
| 204         | Resource deleted successfully  |
| 404         | Resource not found             |
| 422         | Invalid request data           |

## Project Structure

```
.
├── task_manager.js
├── package.json
├── package-lock.json
└── README.md
```

## Notes

* This API uses an **in-memory array** to store tasks.
* All data is lost when the server is restarted.
* The project is intended for learning REST API development with Express.js and Swagger.

## Future Improvements

* Store tasks in a database (MongoDB, PostgreSQL, or MySQL)
* User authentication and authorization
* Input validation
* Persistent data storage
* Unit and integration tests
* Docker support
* Environment variable configuration

## Author

Developed as an Express.js REST API learning project.

