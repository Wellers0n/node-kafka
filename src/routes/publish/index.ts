import { Router } from "express";
import LocationController from "../../controllers/publish";
import authentication from "../../middleware/authentication";

const publishRoutes = Router();

/**
 * @swagger
 * /publish/:
 *   post:
 *     security: 
 *       - token: []
 *     description: publish
 *     tags: ["Publish"]
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
 *                timestamp:
 *                  type: number
 *                ip:
 *                  type: string
 *              example:
 *                message: "Successful publish"
 *                payload: 
 *                  timestamp: 1684204741
 *                  ip: 134.201.250.155
 *                  clientId: db3bbbb3-d66e-4604-abac-50155395c008
 *                 
 *       401:
 *         description: Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *              example:
 *                message: Not authorized 🥷!
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
 *            example:
 *                message: Failed publish
 *     consumers:
 *        - application/json
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - ip
 *                - timestamp
 *                - clientId
 *              properties:
 *                ip:
 *                  type: string
 *                timestamp:
 *                  type: number
 *                clientId:
 *                  type: string
 * 
 */
publishRoutes.post("/", authentication, LocationController.Publish);

export { publishRoutes };
