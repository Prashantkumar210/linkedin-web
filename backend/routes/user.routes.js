import express from 'express'
import { getCurrentUser, updateProfile } from '../controllers/user.controllers.js';
import isAuth from '../middlewares/isAuth.js';

let userRouter = express.Router();

userRouter.get("/currentuser",isAuth ,getCurrentUser)
userRouter.put("/updateProfile",isAuth ,updateProfile)

export default userRouter