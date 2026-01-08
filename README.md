# Blog-App

A RESTful API for a simple blog application built with **Express.js** and **MySQL**.

## Features

- User registration and authentication
- Create, update, and retrieve blog posts
- User profile management
- Search functionality for users and blogs

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **MySQL** - Database


## API Endpoints

### Users

- `POST /users/signup` - Register a new user
- `POST /users/login` - User login
- `PATCH /users/update/:id` - Update user information
- `GET /users/profile/:id` - Get user profile
- `GET /users/search` - Search users

### Blogs

- `POST /blogs/create-blog/:userId` - Create a new blog post
- `PATCH /blogs/update-blog/:id` - Update a blog post
- `GET /blogs/get-blogs` - Retrieve all blog posts

## Database Schema

### Users Table
- `id` (Primary Key)
- `first_name`
- `last_name`
- `date_of_birth`
- `email` (Unique)
- `password`
- `confirmed` (Boolean)
- `created_at`
- `updated_at`

### Blogs Table
- `id` (Primary Key)
- `title`
- `body`
- `created_at`
- `updated_at`
- `user_id` (Foreign Key to Users)
