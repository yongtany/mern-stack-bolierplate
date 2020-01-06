import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { router } from './routes/users';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(router);

const port: number| string = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
