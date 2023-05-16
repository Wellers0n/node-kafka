import { Request, Response } from "express";
import SessionServices from "../../services/session";

const Register = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response
      .status(400)
      .json({
        token: null,
        message: "Name, email and password is required",
      });
  }

  const { message, status } = await SessionServices.Register({
    name,
    email,
    password,
  });

  return response.status(status).json({ message });
};

export default Register;
