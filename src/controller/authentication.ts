import express from "express";
import { authentication, random } from "../helpers/index";
import { createAccount, getUserByEmail } from "./../db/Users";

const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const userExisting = await getUserByEmail(email);
    if (userExisting) {
      return res.sendStatus(400);
    }
    const salt = await random();
    const user = await createAccount({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(user).end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export { register };
