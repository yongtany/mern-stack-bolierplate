import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import bcrypt from 'bcrypt';

const config = require("../config/keys");

const sendMail = (email: any) => {
  const options = {
    auth : {
      api_user: config.sendGridUser,
      api_key: config.sendGridPassword,
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};
const salt = 10;

export const sendSignUpMail = async (address: string) => {
  const hash = await bcrypt.hash(address, salt);
  
  const email = {
    from: 'mern@mernfrom.com',
    to: address,
    subject: '회원가입 이메일 🔒',
    html: `
      <div style="text-align: center; margin: 0 auto;">
        <h2>MERN</h2>
        <div style="display: inline-block; width: 400px; height: 50px; border: 1px #A8AEB3 solid; border-radius: 3px; background-color: #F8F9FA; padding: 15px;">
          <p style="color: #A8AEB3">
            <span><b>안녕하세요!</b></span> 회원가입을 계속하시려면 하단의 링크를 클릭하세요. 만약에 실수로 요청하셨거나, 본인이 요청하지 않았다면, 이 메일을 무시하세요.
          </p>
        </div>
        <div style="margin-top: 1rem">
          <a href="https://www.bolierplate.com/login?code=${hash}"><button style="color: white; background-color: #845DF7; width: 10rem; height: 2rem;">계속하기</button></a>
        </div>
      </div>
    `
  };
  return sendMail(email);
};

export const sendSignInMail = (address: string) => {
  const email = {
    from: 'mern@mernfrom.com',
    to: address,
    subject: '로그인 이메일 🔒',
    html: `
      <div style="text-align: center; margin: 0 auto;">
        <h2>MERN</h2>
        <div style="display: inline-block; width: 400px; height: 50px; border: 1px #A8AEB3 solid; border-radius: 3px; background-color: #F8F9FA; padding: 15px;">
          <p style="color: #A8AEB3">
            <span><b>안녕하세요!</b></span> 로그인을 계속하시려면 하단의 링크를 클릭하세요. 만약에 실수로 요청하셨거나, 본인이 요청하지 않았다면, 이 메일을 무시하세요.
          </p>
        </div>
        <div style="margin-top: 1rem">
          <a href="https://www.bolierplate.com/register?code=$"><button style="color: white; background-color: #845DF7; width: 10rem; height: 2rem;">계속하기</button></a>
        </div>
      </div>
    `
  };
  return sendMail(email);
};

