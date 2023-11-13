import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

const UserModel = model("User", UserSchema);

const getUser = () => UserModel.find();
const getUserByEmail = (email: String) => UserModel.findOne({ email });
const getUserBySessionToken = (sessionToken: String) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
const getUserById = (id: String) => UserModel.findById(id);
const createAccount = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
const deleteUserById = (id: String) => UserModel.findOneAndDelete({ _id: id });
const updateUserById = (id: String, value: Record<string, any>) =>
  UserModel.findOneAndUpdate(id, value);

export {
  UserModel,
  createAccount,
  deleteUserById,
  getUser,
  getUserByEmail,
  getUserById,
  getUserBySessionToken,
  updateUserById,
};
