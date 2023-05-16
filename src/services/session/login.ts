import Users from "../../models/users";
import { generateToken } from "./auth";
import { v4 as uuidv4 } from "uuid";

type LoginProps = {
  email: string;
  password: string;
};

const login = async ({ email, password }: LoginProps) => {
  let user = await Users.findOne({ email, password });
  if (user) {
    const id = user._id;
    let token = generateToken(id);
    return {
      token,
      message: "Successful login",
      status: 200,
      clientId: uuidv4(),
    };
  } else {
    return {
      token: null,
      clientId: null,
      message: "Invalid credentials˝",
      status: 400,
    };
  }
};

export default login;
