declare namespace Express {

  interface Request {

      user: any;
      token: string;
      _id: string;
      check(msg1: String, msg2?: String): any;
      notEmpty(): any;
      validationErrors(): any
  }

}

declare module 'nodemailer-sendgrid-transport' {
  global {
    
  }
  function sgTransport(option: any): any;

  export default sgTransport;
}