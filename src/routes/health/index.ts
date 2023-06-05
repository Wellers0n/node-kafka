import { Router } from 'express'
import healthVerifyController from '../../controllers/health/veriify'

const healthRoutes = Router()

/**
 * @swagger
 * /health/verify:
 *   get:
 *     description: health
 *     tags: ["Health"]
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
 *              example:
 *                message: Server is fine 🔥
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *              example:
 *                message: Server is down 🔥!
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
 */
healthRoutes.get('/verify', healthVerifyController)

export { healthRoutes }