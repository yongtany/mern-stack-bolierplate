import { Request, Response } from 'express';
import HTTPStatus from 'http-status';

import { User } from '../models/User/user.model';
import { sendSignUpMail, sendSignInMail } from '../utils/mail';

export async function sendMail(req: Request, res: Response) {
  const { email } = req.body; 

  const foundUser = await User.findOne({ "email": email });
  if(!foundUser) {
    sendSignUpMail(email);
  } else {
    //sendLogInMail(email);
  }
}

export function signUp() {

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

export async function logout(req: Request, res: Response) {
  await User.findOneAndUpdate({ _id: req.user._id }, {$set: { token: "", tokenExp: ""}}, (err, doc) => {
    if(err) return res.json({ success: false, err });
    return res.status(HTTPStatus.OK).send({
      success: true
    });
  });
};