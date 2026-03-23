import { Router } from "express";
import {
  sendMessage,
  getChats,
  getMessages,
} from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authUser, sendMessage);

export default chatRouter;
