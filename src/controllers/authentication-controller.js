import httpStatus from "http-status";
import authenticationService from "../services/authentication-service.js";

export async function signIn(req, res) {
  const { email, password } = req.body;

  const createdCustomer = await authenticationService.signInPost({
    email,
    password,
  });

  return res.status(httpStatus.OK).send(createdCustomer);
}

export async function logInWithOauthPost(req, res) {
  const { name, email } = req.body;

  const result = await authenticationService.logInWithOauth({ name, email });

  return res.status(httpStatus.OK).send(result);
}

export async function signUp(req, res) {
  const { email, password, name } = req.body;
  console.log(email);

  const customerCreated = await authenticationService.createCustomer({
    email,
    password,
    name,
  });

  return res.status(httpStatus.CREATED).send({
    id: customerCreated.id,
    email: customerCreated.email,
  });
}
