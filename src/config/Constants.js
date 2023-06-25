const constants = {
  baseUrl: "http://192.168.0.107:4000/",
  api: {
    signup: "users/signup",
    signin: "users/signin",
    getUser: "users/get-user",
    updateUser: "users/update",
    forgetPassword: "users/forget-password",
    resetPassword: "users/confirm-reset-password",

    addWarehouse: "storage/warehouse/add",
    addStoreroom: "storage/storeroom/add",
    addRack: "storage/rack/add",
    getWarehouses: "storage/warehouses",
    getStorerooms: "storage/storerooms",
    getRacks: "storage/racks",

    getBoxes: "boxes/user",
    createBox: "boxes/create",
    search: "boxes/search?query",
  },
};

export default constants;
