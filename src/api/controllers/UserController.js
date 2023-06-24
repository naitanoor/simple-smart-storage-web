import { HttpClient } from "../HttpClient";
import config from "../../config/Constants";

export class UserController {
  static signUp = async (payload) => {
    const data = await HttpClient.post(config.api.signup, payload);
    return data;
  };

  static signIn = async (payload) => {
    const data = await HttpClient.post(config.api.signin, payload);
    return data;
  };

  static getUserData = async (userId) => {
    const url = `${config.api.getUser}/${userId}`;
    const data = await HttpClient.get(url);
    return data;
  };

  static forgetPassword = async (payload) => {
    const data = await HttpClient.post(config.api.forgetPassword, payload);
    return data;
  };

  static resetPassword = async (payload) => {
    const data = await HttpClient.post(config.api.resetPassword, payload);
    return data;
  };

  static updateUser = async (userId, payload) => {
    const url = `${config.api.updateUser}/${userId}`;
    const data = await HttpClient.put(url, payload);
    return data;
  };
}
