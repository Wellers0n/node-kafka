import { Request, Response } from "express";
import SessionServices from "../../services/session";

const Login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response
      .status(400)
      .json({ message: "Email and password is required" });
  }

  const { message, token, status, clientId } = await SessionServices.Login({
    email,
    password,
  });

  return response.status(status).json({ message, token, clientId });
};

export default Login;
