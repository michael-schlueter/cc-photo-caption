import express from "express";
import { isAuthenticated } from "../middleware";

import {
  getAllUsers,
  getUser,
  deleteUser,
  registerUser,
  updateUser,
  loginUser,
  validateRefreshToken,
  revokeRefreshTokens,
} from "../controller/users";

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Get all users
 *    produces:
 *      - application/json
 *    tags:
 *      - Users
 *    responses:
 *      "200":
 *        description: returns a list of all users
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/User'
 *      "404":
 *        description: no users found
 */
userRouter.get("/", getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: Get a specific user
 *    produces:
 *      - application/json
 *    tags:
 *      - Users
 *    parameters:
 *      - name: id
 *        description: user id
 *        in: path
 *        type: integer
 *        required: true
 *        example: 1
 *    responses:
 *      "200":
 *        description: returns a specific user along with their captions
 *      schema:
 *        $ref: '#/components/schemas/User'
 *      "404":
 *        description: User not found
 */
userRouter.get("/:id", getUser);

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Creates a new user
 *    produces:
 *      - application/json
 *    tags:
 *      - Users
 *    requestBody:
 *      description: Data for new user
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *      responses:
 *        "201":
 *          description: Returns created user
 *          schema:
 *            $ref: '#/components/schemas/User'
 *        "400":
 *          description: Email already in use
 *        "400": 
 *          description: No valid email address
 *        "400":
 *          description: No valid password
 */
userRouter.post("/", registerUser);

/**
 * @swagger
 * /users/login:
 *  post:
 *    summary: Login to get user's access and refresh tokens
 *    produces:
 *      - application/json
 *    tags:
 *      - Users
 *    requestBody:
 *      description: User data to login
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: testuser@test.com
 *              password:
 *                type: string
 *                example: P4$sword
 *    responses:
 *      "201":
 *        description: Logs in user and returns access and refresh token
 *        schema:
 *          type: object
 *          properties:
 *            accessToken:
 *              type: string
 *            refreshToken:
 *              type: string
 *      "400":
 *        description: Email and/or password not provided
 *      "401":
 *        description: Invalid login credentials
 */
userRouter.post("/login", loginUser);

/**
 * @swagger
 * /users/refreshToken:
 *  post:
 *    summary: Retrieves a new refresh token
 *    produces:
 *      - application/json
 *    tags: Users
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      description: Valid refresh token to retrieve a new one
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              refreshToken:
 *                type: string
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImp0aSI6IjljOWExNTQwLTljYjYtNDlmZS1hOThkLTk0NTY3ZDU3M2VhZiIsImlhdCI6MTY2OTM3NDY1NywiZXhwIjoxNjY5NDAzNDU3fQ.uV7QuvKaPoWo4HnFP3CWAdRq7_cCfYQ_LuUZDcjmY_k
 *    responses:
 *      "201":
 *        description: Retrieves new refresh token
 *        schema:
 *          type: object
 *          properties:
 *            accessToken:
 *              type: string
 *            refreshToken:
 *              type: string
 *      "401":
 *        description: Unauthorized to retrieve new refresh token
 */
userRouter.post("/refreshToken", isAuthenticated, validateRefreshToken);
userRouter.post(":id", isAuthenticated, revokeRefreshTokens);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Updates the email and/or password of a specific user
 *    produces:
 *      - application/json
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        description: ID of the user to update
 *        in: path
 *        type: integer
 *        required: true
 *        example: 1
 *    requestBody:
 *      description: Updated description
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: testuser@test.com
 *              password:
 *                type: string
 *                example: P4$sword
 *    responses:
 *      "201":
 *        description: returns updated user
 *        schema:
 *          $ref: '#components/schemas/User
 *      "400":
 *        description: Email and/or password is missing
 *      "400":
 *        description: Email already in use
 *      "400":
 *        description: No valid email address
 *      "400":
 *        description: No valid password
 *      "401":
 *        description: User is not authenticated
 *      "403":
 *        description: User is not authorized to update this user
 *      "404":
 *        description: User not found
 */
userRouter.put("/:id", isAuthenticated, updateUser);

/**
 * @swagger
 *  /users/{id}:
 *    delete:
 *      summary: Deletes a specific user
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          description: ID of the user to delete
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: User deleted
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to delete this user
 *        "404":
 *          description: User not found
 */
userRouter.delete("/:id", isAuthenticated, deleteUser);

module.exports = userRouter;
