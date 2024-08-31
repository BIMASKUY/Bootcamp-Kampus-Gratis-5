import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

const router = Router();

interface IUser {
  name: string;
  email: string;
  phoneNumber: string;
}

router.get('/users', async (req: Request, res: Response) => {
  const users: IUser[] = await User.find({});
  res.status(200).json({
    data: users
  });
});

router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phoneNumber }: IUser = req.body;
    if (!name || !email || !phoneNumber) throw new Error('Tolong lengkapi data');

    const user: IUser = await User.create(req.body);
    res.status(201).json({
      data: {
        user
      }
    });
  } catch (e) {
    next(e);
  }
});

router.put('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { name, email, phoneNumber }: IUser = req.body;
    if (!req.params.id) throw new Error('Masukkan id user yang ingin diubah');
    if (!name || !email || !phoneNumber) throw new Error('Tolong lengkapi data');

    const findUser: IUser | null = await User.findById(req.params.id);
    if (!findUser) throw new Error('User tidak ditemukan');

    const user: IUser | null = await User.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true
    });

    res.status(200).json({
      data: {
        user
      }
    });
  }
  catch (e) {
    next(e);
  }
});

router.patch('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { name, email, phoneNumber }: IUser = req.body;
    if (!req.params.id) throw new Error('Masukkan id user yang ingin diubah');
    if (!name && !email && !phoneNumber) throw new Error('Tolong isi minimal satu data');

    const findUser: IUser | null = await User.findById(req.params.id);
    if (!findUser) throw new Error('User tidak ditemukan');

    if (name) findUser.name = name;
    if (email) findUser.email = email;
    if (phoneNumber) findUser.phoneNumber = phoneNumber;

    const user = await User.findByIdAndUpdate(req.params.id, findUser, { 
      new: true,
      runValidators: true
    });

    res.status(200).json({
      data: {
        user
      }
    });
  }
  catch (e) {
    next(e);
  }
});

router.delete('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.id) throw new Error('Tolong masukkan id user');

    const findUser: IUser | null = await User.findById(req.params.id);
    if (!findUser) throw new Error('User tidak ditemukan');

    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
})

export default router;
