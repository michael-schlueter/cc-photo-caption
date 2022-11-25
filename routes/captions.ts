import express from "express";
import { isAdmin, isAuthenticated } from "../middleware";

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
 * /captions:
 *  get:
 *    summary: Get all captions
 *    produces:
 *      - application/json
 *    tags:
 *      - Captions
 *    responses:
 *      "200":
 *        description: returns a list of all captions
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Caption'
 *      "404":
 *        description: no captions found
 */
captionRouter.get("/", getAllCaptions);

/**
 * @swagger
 * /captions/{id}:
 *  get:
 *    summary: Get a specific caption
 *    produces:
 *      - application/json
 *    tags:
 *      - Captions
 *    parameters:
 *      - name: id
 *        description: caption id
 *        in: path
 *        type: integer
 *        required: true
 *        example: 1
 *    responses:
 *      "200":
 *        description: returns a specific caption
 *      schema:
 *        $ref: '#/components/schemas/Caption'
 *      "404":
 *        description: Caption not found
 */
captionRouter.get("/:id", getCaption);

/**
 * @swagger
 * /captions:
 *  post:
 *    summary: Creates a new caption
 *    produces:
 *      - application/json
 *    tags:
 *      - Captions
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      description: Data for new caption
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Caption
 *    responses:
 *      "201":
 *        descriptions: returns created caption
 *        schema:
 *          $ref: '#components/schemas/Caption
 *      "400":
 *        description: Description, image ID or user ID missing
 *      "400":
 *        description: Provided image ID does not exist
 *      "401":
 *        description: User not authenticated
 */
captionRouter.post("/", isAuthenticated, addCaption);

/**
 * @swagger
 * /captions/{id}:
 *  put:
 *    summary: Updates the description of a specific caption
 *    produces:
 *      - application/json
 *    tags:
 *      - Captions
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        description: ID of the caption to update
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
 *              description:
 *                type: string
 *                example: What a wonderful photo
 *    responses:
 *      "201":
 *        description: returns updated caption
 *        schema:
 *          $ref: '#components/schemas/Caption
 *      "400":
 *        description: Description is missing
 *      "401":
 *        description: User is not authenticated
 *      "403":
 *        description: User is not authorized to update this caption
 *      "404":
 *        description: Caption not found
 */
captionRouter.put("/:id", isAuthenticated, updateCaption);

/**
 * @swagger
 *  /captions/{id}:
 *    delete:
 *      summary: Deletes a specific caption
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
 *          example: 1
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
