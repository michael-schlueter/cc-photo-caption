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
 * components:
 *  schemas:
 *      Image:
 *          type: object
 *          required:
 *              - url
 *          properties:
 *              url:
 *                  type: string
 *                  description: URL path to image file
 *              name:
 *                  type: string
 *                  description: Name for the image
 *          example:
 *              url: /images/sample.jpg
 *              name: Sample Image
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */

/**
 * @swagger
 * /api/images:
 *    get:
 *      summary: Get all images
 *      produces:
 *        - application/json
 *      tags:
 *        - Images
 *      responses:
 *        "200":
 *          description: Returns a list of all images
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Image'
 *        "404":
 *          description: No images found
 */
imageRouter.get("/", getAllImages);

/**
 * @swagger
 * /api/images/{id}:
 *    get:
 *      summary: Get a specific image with its corresponding captions
 *      produces:
 *        - application/json
 *      tags:
 *        - Images
 *      parameters:
 *        - name: id
 *          description: Image id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: Returns a single image with its captions
 *          schema:
 *            $ref: '#/components/schemas/Image'
 *        "404":
 *          description: Image not found
 */
imageRouter.get("/:id", getImage);

/**
 * @swagger
 * /api/images:
 *    post:
 *      summary: Creates a new image
 *      produces:
 *        - application/json
 *      tags:
 *        - Images
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: Data for new image
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Image'
 *      responses:
 *        "201":
 *          description: Returns created image
 *          schema:
 *            $ref: '#/components/schemas/Image'
 *        "400":
 *          description: URL path is missing / URL path already exists
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to create images (needs admin rights)
 */
imageRouter.post("/", isAuthenticated, isAdmin, addImage);

/**
 * @swagger
 * /api/images/{id}:
 *    put:
 *      summary: Updates the data of an image
 *      produces:
 *        - application/json
 *      tags:
 *        - Images
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          description: ID of the image to update
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Updated image data
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Image'
 *      responses:
 *        "201":
 *          description: Returns updated image
 *          schema:
 *            $ref: '#/components/schemas/Image'
 *        "400":
 *          description: URL path is missing / URL path already exists
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to update this image
 *        "404":
 *          description: Image not found
 */
imageRouter.put("/:id", isAuthenticated, isAdmin, updateImage);

/**
 * @swagger
 * /api/images/{id}:
 *    delete:
 *      summary: Deletes an image
 *      produces:
 *        - application/json
 *      tags:
 *        - Images
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          description: Image id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 3
 *      responses:
 *        "204":
 *          description: Image deleted
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to delete this image
 *        "404":
 *          description: Image not found
 */
imageRouter.delete("/:id", isAuthenticated, isAdmin, deleteImage);

module.exports = imageRouter;
