import { HttpClient } from "../HttpClient";
import config from "../../config/Constants";

export class BoxController {
  static getAllBoxes = async (userId) => {
    const url = `${config.api.getBoxes}/${userId}`;
    const data = await HttpClient.get(url);
    return data;
  };

  static createPackage = async (payload) => {
    const data = await HttpClient.post(config.api.createBox, payload);
    return data;
  };

  static searchBox = async (query, userId) => {
    const url = `${config.api.search}=${query}&userId=${userId}`;
    const data = await HttpClient.get(url);
    return data;
  };
}
