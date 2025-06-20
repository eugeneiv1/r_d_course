import * as userModel from '../models/user.model.js'

export const getAllUsers = async () => {
    return await userModel.getAllUsers();
}

export const getUserById = async (id) => {
    return await userModel.getUserById(id);
}

export const updateUser = async (id, data) => {
    return await userModel.updateUser(id, data)
}

export const deleteUser = async (id) => {
    return userModel.deleteUser(id)
}

export const createUser = async (data) => {
    return await userModel.createUser(data)
}
