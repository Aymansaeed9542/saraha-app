import express from 'express'
import cors from 'cors'
import { port } from '../config/env.service.js';
import { connectDB } from './database/connection.js';
import authRouter from './modules/auth/auth.controller.js'
import messagesRouter from './modules/messages/messages.controller.js'
import usersRouter from './modules/users/users.controller.js'
import { globalErrorHandler } from './common/utils/response/error.responce.js';
export const bootstrap = async () => {
  const app = express();

  // Middleware to parse JSON
  app.use(express.json());
  app.use(cors());

  // Serve uploads folder staticly
  app.use('/uploads', express.static('uploads'));

  await connectDB() // use await with any work with database


app.use('/auth', authRouter)
app.use('/messages', messagesRouter)
app.use('/users', usersRouter)


  app.use('{*dummy}', (req, res) => {
    res.status(404).json('Page not found')}) //check if the route is valid or not

      app.use(globalErrorHandler)  // global error handler middleware
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}