const express = require("express");
const router = express.Router();
const swagger = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Photo Caption",
      version: "1.0.0",
      description:
        "Backend API to manage photos with captions. Built with Prisma, Express and Node",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/",
      },
    },
  },
  apis: ["./routes/captions.ts", "./routes/images.ts", "./routes/users.ts"],
};

const specs = swagger(swaggerOptions);

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
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
 *                  description: fk of the image this description is captioning
 *              userId:
 *                  type: integer
 *                  description: fk of the user who creates this caption
 *              description:
 *                  type: string
 *                  description: caption for this image
 *          example:
 *              imageId: 2
 *              userId: 1
 *              description: This is a wonderful image
 *      Image:
 *          type: object
 *          required:
 *              - url
 *          properties:
 *              url:
 *                  type: string
 *                  description: path to image file
 *              name:
 *                  type: string
 *                  description: name for the image
 *          example:
 *              path: /images/sample.jpg
 *              name: Sample Image
 *      User:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  format: email
 *                  description: Email for the user, must be unique
 *              password:
 *                  type: string
 *                  description: Password has to have at minimum 8 characters with one lowercase letter, one uppercase letter, one number and one special character
 *              isAdmin:
 *                  type: boolean
 *                  description: Indicates if the user is an admin or not (default is false)
 *          example:
 *              email: testuser@test.com
 *              password: P4$sword
 *              isAdmin: false
 */

module.exports = router;
