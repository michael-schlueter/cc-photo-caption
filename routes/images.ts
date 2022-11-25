import express from "express";

import {
  getAllImages,
  getImage,
  deleteImage,
  addImage,
  updateImage,
} from "../controller/images";
import { isAuthenticated, isAdmin } from "../middleware";

const imageRouter = express.Router();

/**
 * @swagger
 * /images:
 *  get:
 *    summary: Get all photos
 *    produces:
 *      - application/json
 *    tags:
 *      - Images
 *    responses:
 *      "200":
 *        description: returns a list of all photos
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Image'
 *      "404":
 *        description: no images found
 */
imageRouter.get("/", getAllImages);

/**
 * @swagger
 * /images/{id}:
 *  get:
 *    summary: Get a specific photo with captions
 *    produces:
 *      - application/json
 *    tags:
 *      - Images
 *    parameters:
 *      - name: id
 *        description: image id
 *        in: path
 *        type: integer
 *        required: true
 *        example: 1
 *    responses:
 *      "200":
 *        description: returns a photo with its captions
 *      schema:
 *        $ref: '#/components/schemas/Image'
 *      "404":
 *        description: Image not found
 */
imageRouter.get("/:id", getImage);

/**
 * @swagger
 * /images:
 *  post:
 *    summary: Creates a new image
 *    produces:
 *      - application/json
 *    tags:
 *      - Images
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      description: Data for new image
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Image
 *    responses:
 *      "201":
 *        descriptions: returns created image
 *        schema:
 *          $ref: '#components/schemas/Image
 *      "401":
 *        description: User is not authenticated
 *      "403":
 *        description: User is not authorized to create an image
 */
imageRouter.post("/", isAuthenticated, isAdmin, addImage);

/**
 * @swagger
 * /images/{id}:
 *  put:
 *    summary: Updates the data of a specific image
 *    produces:
 *      - application/json
 *    tags:
 *      - Images
 *    security: bearerAuth: []
 *    parameters:
 *      - name: id
 *        description: ID of the image to update
 *        in: path
 *        type: integer
 *        required: true
 *        example: 1
 *    requestBody:
 *      description: Data to update the image
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: A dog
 *              url:
 *                type: string
 *                description: path to image
 *                example: /images/puppy.jpg
 *    responses:
 *      "201":
 *        description: returns updated image
 *        schema:
 *          $ref: '#components/schemas/Image
 *      "400":
 *        description: Image path is missing
 *      "400":
 *        description: Image path is already in use
 *      "401":
 *        description: User is not authenticated
 *      "403":
 *        description: User is not authorized to update the image
 *      "404":
 *        description: Image not found
 */
imageRouter.put("/:id", isAuthenticated, isAdmin, updateImage);

/**
 * @swagger
 *  /images/{id}:
 *    delete:
 *      summary: Deletes a specific image
 *      produces:
 *        - application/json
 *      tags:
 *        - Images
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          description: ID of the image to delete
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: Image deleted
 *        "401":
 *          description: User is not authenticated
 *        "403":
 *          description: User is not authorized to delete the image
 *        "404":
 *          description: Image not found
 */
imageRouter.delete("/:id", isAuthenticated, isAdmin, deleteImage);

module.exports = imageRouter;
