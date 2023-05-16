import { Router } from "express";
import SessionController from "../../controllers/session";

const sessionRoutes = Router();

/**
 * @swagger
 * /session/login:
 *   post:
 *     description: login
 *     tags: ["Session"]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                clientId:
 *                  type: ["string", "null"]
 *                token:
 *                  type: ["string", "null"]
 *              example:
 *                message: Successful login
 *                clientId: db3bbbb3-d66e-4604-abac-50155395c008
 *                token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjkyMjkwMjh9.kWzb6evDjKORu9097C5PFrSsfFpL0sxgqlyv-tLDWFc
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                clientId:
 *                  type: ["string", "null"]
 *                token:
 *                  type: ["string", "null"]
 *            examples:
 *                required:
 *                  summary: fields required
 *                  value:
 *                    message: Email and password is required
 *                    clientId: null
 *                    token: null
 *                error:
 *                  summary: verify credentials
 *                  value:
 *                    message: Invalid credentials
 *                    clientId: null
 *                    token: null
 *     consumers:
 *        - application/json
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 */
sessionRoutes.post("/login", SessionController.Login);

/**
 * @swagger
 * /session/register:
 *   post:
 *     description: register
 *     tags: ["Session"]
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                error:
 *                  type: boolean
 *                token:
 *                  type: ["string", "null"]
 *              example:
 *                message: User created successfully
 *                error: false
 *                token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjkyMjkwMjh9.kWzb6evDjKORu9097C5PFrSsfFpL0sxgqlyv-tLDWFc
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                error:
 *                  type: boolean
 *                token:
 *                  type: ["string", "null"]
 *            examples:
 *                required:
 *                  summary: fields required
 *                  value:
 *                    message: Name, email and password is required
 *                    error: true
 *                    token: null
 *                user:
 *                  summary: user already exists
 *                  value:
 *                    message: user already exists
 *                    error: true
 *                    token: null
 *     consumers:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - email
 *                - password
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 */
sessionRoutes.post("/register", SessionController.Register);

export { sessionRoutes };
