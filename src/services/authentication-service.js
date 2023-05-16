import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import customerRepository from "../repositories/customer-repository.js";
import sessionRepository from "../repositories/session-repository.js";
import { invalidCredentialsError } from "../errors/invalid-credentials-error.js";
import { duplicatedEmailError } from "../errors/invalid-email-error.js";

async function signInPost({ email, password }) {
  const customer = await getCustomer(email);

  await validatePassword(password, customer.password);

  const token = await createSession(customer.id);

  return {
    customer: {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    },
    token,
  };
}

async function logInWithOauth({ name, email }) {
  const findCustomer = await customerRepository.findCustomerByEmail(email);

  if (!findCustomer) {
    const createdCustomer = await customerRepository.createCustomer({ name, email });
    const token = await createSession(createdCustomer.id);

    return {
      customer: {
        id: createdCustomer.id,
        name: createdCustomer.name,
        email: createdCustomer.email,
      },
      token,
    };
  }

  const token = await createSession(findCustomer.id);

  return {
    customer: {
      id: findCustomer.id,
      name: findCustomer.name,
      email: findCustomer.email,
    },
    token,
  };
}

export async function createCustomer({ email, password, name }) {
  await validateEmail(email);
  const hashPassword = await bcrypt.hash(password, 12);

  return await customerRepository.createCustomer({
    name,
    email,
    password: hashPassword,
  });
}

async function validateEmail(email) {
  const emailIsUsed = await customerRepository.findCustomerByEmail(email);
  if (emailIsUsed) throw duplicatedEmailError();
}

async function getCustomer(email) {
  const customer = await customerRepository.findCustomerByEmail(email);
  if (!customer) throw invalidCredentialsError();

  return customer;
}

async function createSession(customerId) {
  const token = jwt.sign({ customerId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    customerId,
  });

  return token;
}

async function validatePassword(password, userPassword) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

const authenticationService = {
  signInPost,
  logInWithOauth,
  createCustomer,
};

export default authenticationService;
