# Photo Caption
> This is a simple Node/Express API to retrieve and caption images. The users can view a list of images with their captions and register to create captions themselves.



## General Information
- The project is part of the Back-end Engineer Curriculum from Codecademy
- The challenge was to build an API providing basic CRUD functionality with authentication/authorization and a proper API documentation
- I deviated from the project requirements by building the API in TypeScript instead of JavaScript because I wanted to gain experience handling TypeScript in an Node.js environment
- I also used Prisma as an ORM instead of Sequelize because of its compatibility with TypeScript



## Technologies Used
- Express 4.18.2
- Typescript 4.8.4
- Prisma 4.5.0
- swagger-jsdoc 6.2.5
- swagger-ui-express 4.6.0
- Supabase
- Bcrypt 5.1.0
- Dotenv 16.0.3
- Jsonwebtoken 8.5.1
- Morgan 1.10.0
- Node-cache 5.1.2
- Uuid 9.0.0



## Features
- Register / login / edit / delete users
- Create / retrieve / update / delete images
- Create / retrieve / update / delete captions for specific images
- Authentication / authorization (e.g., only registered users can create captions, only admins can create/upload images) using auth tokens (JWT)
- Obtain / validate refreshTokens by providing an accessToken
- Caching images to allow quick retrieval



## Setup
The dependencies which are necessary to run this app can be found in the package.json file. Node needs to be installed on your system. You also need a running PostgreSQL database instance.

1. Clone the repo.
2. Navigate to the project folder in the terminal and install the necessary NPM dependencies.
```
npm install
```
3. Create a .env file in the root directory with the following environment variables.
```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA" (connection URL to your database)
PORT=5000
JWT_ACCESS_SECRET=SECRET123
JWT_REFRESH_SECRET=ANOTHER_SECRET123
```
4. Run the command in your terminal to seed the database with some data.
```
npx prisma migrate reset
```
5. Run the command in your terminal to start the server.
```
npm run start
```
6. Go to localhost:5000/api-docs to get to the API documentation. There you can test the API endpoints.



## Learnings
- Building an application with Vite
- Designing an API from scratch
- Building an Node/Express application in TypeScript for type-safety (e.g., implementing types for request / response objects)
- Setting up Prisma (Model, Migration, Seeding)
- Writing database queries using Prisma (Concept of Cascading)
- Error-Handling with Prisma / Typescript
- Setting up and using Swagger to create an API documentation
- Segregate the project into small and simple tasks to better manage the scope of it



## Project Status
This project is basically finished. In the future I may extend this project to a full-stack application by providing a front-end as well. Then I may also implement a voting system to rank images / captions.



## Acknowledgements
- This project is part of the [Codecademy](https://www.codecademy.com) Back-end engineer curriculum.



