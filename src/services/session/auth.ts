import jwt from "jsonwebtoken";
import User from "../../models/users";

export async function getUser(token) {
  if (!token) return { user: null };

  try {
    const decodedToken = jwt.verify(token, "batman") as { id: number };

    const user = await User.findOne({ _id: decodedToken.id });

    return {
      user,
    };
  } catch (err) {
    return { user: null };
  }
}

export function generateToken(user) {
  return jwt.sign({ id: user._id }, "batman");
}
