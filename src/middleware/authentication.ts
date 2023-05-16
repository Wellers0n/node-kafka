import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authentication = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request?.headers?.authorization;

  const jwtSecret = process.env.JWT_SECRET || "batman";

  if (authorization) {
    jwt.verify(authorization, jwtSecret, (err, decoded) => {
      if (err) {
        return response.status(401).json({
          message: "Not authorized 🥷!",
        });
      }

      // AUTHORIZATION OK!
      next();
    });
  } else {
    return response.status(401).json({
      message: "Not authorized 🥷!",
    });
  }
};

export default authentication;
