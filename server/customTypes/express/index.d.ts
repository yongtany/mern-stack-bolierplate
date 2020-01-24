declare namespace Express {

  interface Request {

      user: any;
      token: string;
      _id: string;
  }

}

declare module 'nodemailer-sendgrid-transport' {
  global {
    
  }
  function sgTransport(option: any): any;

  export default sgTransport;
}