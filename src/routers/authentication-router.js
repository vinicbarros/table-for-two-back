import { Router } from "express";
import {
  logInWithOauthPost,
  signIn,
  signUp,
} from "../controllers/authentication-controller.js";

const authenticationRouter = Router();

authenticationRouter
  .post("/sign-in", signIn)
  .post("/sign-up", signUp)
  .post("/oauth", logInWithOauthPost);

export { authenticationRouter };
