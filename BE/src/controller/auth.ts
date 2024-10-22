import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../schema/user';
import { Response, Request } from 'express';

export const Login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const response = await UserModel.findOne({ email });
    console.log(response, 'response')
    if (!response) return res.status(404).send('User not found');

    bcrypt.compare(password, response.password, (_err, result) => {
      if (result) {
        
        const token = jwt.sign({ ...response }, 'password123');

        return res.status(200).cookie('token', token).end();
      } else {
        return res.status(404).send('Incorrect email or password');
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const saltRounds: number = 10;



export const Signup = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password, phoneNumber } = req.body;
  console.log(req.body);

  try {
    const salt: string = await bcrypt.genSalt(saltRounds);
    const hash: string = await bcrypt.hash(password, salt);

    const result = await UserModel.create({
      email,
      name,
      password: hash,
      phone: phoneNumber,
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};