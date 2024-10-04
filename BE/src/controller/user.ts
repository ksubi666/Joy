import { UserModel } from 'src/schema/user';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const response = await UserModel.create({
      name,
      email,
      password: hash,
      phone,
      role,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
