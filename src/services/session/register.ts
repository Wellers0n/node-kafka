import Users from "../../models/users";

type createProps = {
  name: string;
  email: string;
  password: string;
};

const create = async ({ name, email, password }: createProps) => {
  const user = await Users.findOne({ email });
  if (!user) {
    await Users.create({ name, email, password });
    return { message: "user created with success", status: 201 };
  } else {
    return { message: "Error when created an user", status: 400 };
  }
};

export default create;
