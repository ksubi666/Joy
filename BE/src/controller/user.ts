import { UserModel } from 'src/schema/user';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response): Promise<any> => {
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

export const getUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const response = await UserModel.findById(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getUsers = async (res: Response) => {
  try {
    const response = await UserModel.find();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const UserUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, email, password, phone, role } = req.body;

  try {
    const response = await UserModel.findByIdAndUpdate(id, {
      name,
      email,
      password,
      phone,
      role,
    });
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const token = jwt.sign({ ...response }, privateKey as string);

    return res.status(200).cookie('token', token).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const userDelete = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await UserModel.findByIdAndDelete(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
