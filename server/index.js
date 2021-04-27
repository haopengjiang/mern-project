
import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import fileUploadRoutes from "./routes/fileUpload.js";

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);
app.use("/document", fileUploadRoutes)

const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME, user: process.env.DB_USER,pass: process.env.DB_PASS, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);