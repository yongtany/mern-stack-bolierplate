import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import userRouter from './routes/user.routes';

const config = require("./config/keys");

const app = express();

// DB Settings
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));
mongoose.set('useCreateIndex', true)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', userRouter);

const port: number| string = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
