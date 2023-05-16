import { Request, Response } from "express";
import PublishServices from "../../services/publish";
import moment from "moment";

const Publish = async (request: Request, response: Response) => {
  const { ip, timestamp, clientId } = request.body;

  if (!ip || !timestamp || !clientId) {
    return response
      .status(400)
      .json({ message: "IP, timestamp and clientId is required" });
  }

  const { message, payload, status } = await PublishServices.Publish({
    ip,
    timestamp,
    clientId,
  });

  return response
    .status(status)
    .json({ message, payload, clientId, timestamp });
};

export default Publish;
