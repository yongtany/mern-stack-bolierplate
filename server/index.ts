import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/user.routes';
import postRouter from './routes/post.routes';

const config = require("./config/keys");

const app = express();

// DB Settings
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));
mongoose.set('useCreateIndex', true)

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', authRouter);
app.use('/api/post', postRouter);

const port: number| string = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
