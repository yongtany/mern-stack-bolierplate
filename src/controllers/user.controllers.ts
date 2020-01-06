import { Request, Response } from 'express';
import HTTPStatus from 'http-status';

import { User } from '../models/user.model';

export function auth(req: Request, res: Response) {
  res.status(HTTPStatus.OK).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    username: req.user.username,
    role:req.user.role
  })
}

export async function signUp(req: Request, res: Response) {
  const user = new User(req.body);
  await user.save((err: Error) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json({ success: false, err });
    return res.status(HTTPStatus.CREATED).json({
        success: true
    });
  });
}

export async function signIn(req: Request, res: Response) {
  await User.findOne({ email: req.body.email }, (err: Error, user) => {
      if (!user)
          return res.json({
              loginSuccess: false,
              message: "Auth failed, email not found"
          });

      user.comparePassword(req.body.password, (err: Error, isMatch: boolean) => {
          if (!isMatch)
              return res.json({ loginSuccess: false, message: "Wrong password" });

          user.generateToken((err: Error, user: any) => {
              if (err) return res.status(HTTPStatus.BAD_REQUEST).send(err);
              res.cookie("token_exp", user.tokenExp);
              res
                  .cookie("token", user.token)
                  .status(HTTPStatus.OK)
                  .json({
                      loginSuccess: true, userId: user._id
                  });
          });
      });
  });
};


