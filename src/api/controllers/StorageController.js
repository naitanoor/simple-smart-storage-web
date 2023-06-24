import { HttpClient } from "../HttpClient";
import config from "../../config/Constants";

export class StorageController {
  static addWarehouse = async (payload) => {
    const data = await HttpClient.post(config.api.addWarehouse, payload);
    return data;
  };

  static addStoreroom = async (payload) => {
    const data = await HttpClient.post(config.api.addStoreroom, payload);
    return data;
  };

  static addRack = async (payload) => {
    const data = await HttpClient.post(config.api.addRack, payload);
    return data;
  };

  static getUserWarehouses = async (userId) => {
    const url = `${config.api.getWarehouses}/${userId}`;
    const data = await HttpClient.get(url);
    return data;
  };

  static getUserStorerooms = async (warehouseId, userId) => {
    const url = `${config.api.getStorerooms}/${warehouseId}/${userId}`;
    const data = await HttpClient.get(url);
    return data;
  };

  static getRacks = async (userId, warehouseId, storeroomId) => {
    const url = `${config.api.getRacks}/${userId}/${warehouseId}/${storeroomId}`;
    const data = await HttpClient.get(url);
    return data;
  };
}
