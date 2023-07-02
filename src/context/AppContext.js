import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import { BoxController } from "../api/controllers/BoxController";
import { getData } from "../api/CommonFunctions";

export const AppContext = createContext({});

export const CreateBoxStatus = {
  INITIAL: "",
  CREATING_BOX: "Creating box",
  CREATE_BOX_SUCCESS: "Create box success",
  CREATE_BOX_FAIL: "Create box fail",
};

export const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userBoxes, setUserBoxes] = useState([]);
  const [createBoxStatus, setCreateBoxStatus] = useState(
    CreateBoxStatus.INITIAL
  );

  useEffect(() => {
    (async () => {
      const data = await getData("userData");
      if (data) {
        setIsSignedIn(true);
        setUserData(data);
      } else {
        setIsSignedIn(false);
        setUserData(null);
      }
    })();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [createBoxError, setCreateBoxError] = useState("");

  const [mainController, setMainController] = useState({
    boxName: "",
    rackNumber: "",
    storeRoom: "",
    warehouse: "",
    qrCode: "",
    items: [],
  });

  const callback = useCallback((controller) => {
    setMainController((newMainController) => ({
      ...newMainController,
      ...controller,
    }));
  }, []);

  const getUserBoxes = useCallback(() => {
    BoxController.getAllBoxes(userData?.userId)
      .then(async (res) => {
        setUserBoxes(res?.boxes);
      })
      .catch((e) => {});
  }, [userData?.userId]);

  const createPackage = useCallback(() => {
    const payload = {
      ...mainController,
      boxNumber: userBoxes?.length + 1,
      userId: userData?.userId,
    };
    setCreateBoxStatus(CreateBoxStatus.CREATING_BOX);

    return new Promise((resolve, reject) => {
      BoxController.createPackage(payload)
        .then((response) => {
          if (response.success) {
            setCreateBoxStatus(CreateBoxStatus.CREATE_BOX_SUCCESS);
            setMainController({
              boxName: "",
              rackNumber: "",
              storeRoom: "",
              warehouse: "",
              qrCode: "",
              items: [],
            });
            getUserBoxes();
            resolve({ success: true, message: response?.message });
          } else if (!response.success) {
            setCreateBoxError("Error");
            setCreateBoxStatus(CreateBoxStatus.CREATE_BOX_FAIL);
            reject({
              success: false,
              message:
                response?.message || "*Something went wrong, please try again!",
            });
          }
        })
        .catch((e) => {
          const msg = e?.message || "*Something went wrong, please try again!";
          setCreateBoxError(msg);
          setCreateBoxStatus(CreateBoxStatus.CREATE_BOX_FAIL);
          reject({
            success: false,
            message: msg,
          });
        });
    });
  }, [getUserBoxes, mainController, userBoxes?.length, userData?.userId]);

  const memoizedValue = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn,
      userData,
      setUserData,
      userBoxes,
      setUserBoxes,
      currentValues: mainController,
      parentCallback: callback,
      onCreatePackage: createPackage,
      createBoxStatus,
      getUserBoxes,
    }),
    [
      isSignedIn,
      setIsSignedIn,
      userData,
      setUserData,
      userBoxes,
      setUserBoxes,
      mainController,
      callback,
      createPackage,
      createBoxStatus,
      getUserBoxes,
    ]
  );

  return (
    <AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>
  );
};
