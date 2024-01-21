# React + Vite  Authentication App

Welcome to my React Authentication App! This project is a personal project that demonstrates user authentication with login, signup, and user profile functionalities. The project includes both the frontend (React) and the backend.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Screen 
![SignUp Page](https://github.com/AnkurNayak/easyauth/assets/39209074/83583a3a-1be5-4e3b-b662-6c5b69075b5e)


## Features

- User Registration (Signup)
- User Authentication (Login)
- Remember Username Password For Next Login
- User Profile View
- User Profile Update
- User Profile Delete
- Logout
- Backend API for User Management

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- MongoDB installed locally or accessible via a cloud service (for the backend)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/AnkurNayak/EasyAuth

2. Navigate to the project directory:
    ```
    cd easyauth
    
3. Open both frontend and backend in different terminal:
    ```
    cd easyauth
    cd backend-services
4. Install npm for both folder
    ```base
    npm install


## Usage
1. Start the developement server and backend server:
    ```base
    (for backend) :  npm start run
    (for frontend) : npm start dev

2. Open your browser and navigate to http://localhost:5173/

## API Endpoints
- **POST /api/users/signup: Register a new user.**
- **POST /api/users/signin: Authenticate and log in a user.**
-  **GET /api/users/user/:userId: Get user details (requires authentication).**
- **PUT /api/users/user/update/:userId: Update user information (requires authentication).**
- **DELETE /api/users/delete/:userId: Delete a user account (requires authentication)..**

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/)


    
    




   
