import * as userModel from '../models/user.model';

export const createUser = async (userData: userModel.UserData) => {
  if (!userData.email || !userData.nome || !userData.senha_hash) {
    throw new Error('Missing required fields');
  }
  if (userData.nome.length < 3) {
    throw new Error('Nome must be at least 3 characters');
  }

  return userModel.createUser(userData);
};


export const getAllUsers = async () => {
  return userModel.getUsers();
};