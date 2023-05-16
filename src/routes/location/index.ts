import { Router } from "express";
import LocationController from "../../controllers/location";
import authentication from "../../middleware/authentication";

const locationRoutes = Router();

/**
 * @swagger
 * /location/:
 *   post:
 *     security: 
 *       - token: []
 *     description: location
 *     tags: ["Location"]
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
 *                ip:
 *                  type: string
 *                latitude:
 *                  type: number
 *                longitude:
 *                  type: number
 *                country_name:
 *                  type: string
 *                country_code:
 *                  type: string
 *                region_name:
 *                  type: string
 *                region_code:
 *                  type: string
 *                city:
 *                  type: string
 *              example:
 *                clientId: db3bbbb3-d66e-4604-abac-50155395c008
 *                message: "Successful search"
 *                payload: 
 *                  timestamp: 1684204741
 *                  ip: 134.201.250.155
 *                  latitude: -20.77618980407715
 *                  longitude: -41.67591094970703
 *                  country_name: Brazil
 *                  country_code: BR
 *                  region_name: Espírito Santo
 *                  region_code: ES
 *                  city: "Guaçuí"
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
 *                message: Failed search
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
locationRoutes.post("/", authentication, LocationController.Search);

export { locationRoutes };
