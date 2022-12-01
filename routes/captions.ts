import express from "express";
import { isAuthenticated } from "../middleware";

import {
  getAllCaptions,
  getCaption,
  deleteCaption,
  addCaption,
  updateCaption,
} from "../controller/captions";

const captionRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Caption:
 *          type: object
 *          required:
 *              - imageId
 *              - userId
 *              - description
 *          properties:
 *              imageId:
 *                  type: integer
 *                  description: Refers to the image this caption is made for (FK)
 *              userId:
 *                  type: integer
 *                  description: Refers to the user who made this caption (FK)
 *              description:
 *                  type: string
 *                  description: Caption for this image
 *          example:
 *              imageId: 2
 *              userId: 1
 *              description: This is a wonderful image
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */

/**
 * @swagger
 * /api/captions:
 *    get:
 *      summary: Get all captions
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      responses:
 *        "200":
 *          description: Returns a list of all captions
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Caption'
 *        "404":
 *          description: No captions found
 */
captionRouter.get("/", getAllCaptions);

/**
 * @swagger
 * /api/captions/{id}:
 *    get:
 *      summary: Get a specific caption
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      parameters:
 *        - name: id
 *          description: caption id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: Returns a single caption
 *          schema:
 *            $ref: '#/components/schemas/Caption'
 *        "404":
 *          description: Caption not found
 */
captionRouter.get("/:id", getCaption);

/**
 * @swagger
 * /api/captions:
 *    post:
 *      summary: Creates a new caption
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: Data for new caption
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Caption'
 *      responses:
 *        "201":
 *          description: Returns created caption
 *          schema:
 *            $ref: '#/components/schemas/Caption'
 *        "400":
 *          description: No description, imageId, userId provided or imageId does not exist
 *        "401":
 *          description: User not authenticated
 */
captionRouter.post("/", isAuthenticated, addCaption);

/**
 * @swagger
 * /api/captions/{id}:
 *    put:
 *      summary: Updates the description of a caption
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          description: ID of the caption to update
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Updated description
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                description:
 *                  type: string
 *                  example: This is a wonderful image
 *      responses:
 *        "201":
 *          description: Returns updated caption
 *          schema:
 *            $ref: '#/components/schemas/Caption'
 *        "400":
 *          description: No description provided
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to update this caption
 *        "404":
 *          description: Caption not found
 */
captionRouter.put("/:id", isAuthenticated, updateCaption);

/**
 * @swagger
 * /api/captions/{id}:
 *    delete:
 *      summary: Deletes a caption
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          description: ID of the caption to delete
 *          in: path
 *          type: integer
 *          required: true
 *          example: 3
 *      responses:
 *        "204":
 *          description: Caption deleted
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to delete this caption
 *        "404":
 *          description: Caption not found
 */
captionRouter.delete("/:id", isAuthenticated, deleteCaption);

module.exports = captionRouter;
