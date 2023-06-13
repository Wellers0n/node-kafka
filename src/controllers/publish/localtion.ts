import { Request, Response } from 'express'
import publishLocationServices from '../../services/publish/location'
import z, { ZodError } from 'zod'

const publishLocation = async (request: Request, response: Response) => {
  try {
    const createLocationSchema = z.object({
      ip: z.string({
        required_error: 'Ip is required'
      }),
      clientId: z.string({
        required_error: 'clientId is required'
      }),
      timestamp: z.number({
        required_error: 'Timestamp is required'
      })
    })

    const { ip, timestamp, clientId } = createLocationSchema.parse(request.body)

    const { message, payload, status } = await publishLocationServices({
      ip,
      timestamp,
      clientId
    })

    return response.status(status).json({ message, payload })
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({ message: error.errors[0].message })
    }
  }
}

export default publishLocation
