declare namespace Express {

  interface Request {

      user: any;
      token: string;
      _id: string;
  }

}