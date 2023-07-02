import React, { useContext, useState } from "react";
import QRCode from "react-qr-code";
import { notification } from "antd";
import { QrReader } from "react-qr-reader";
import { useLocation, useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import { BoxController } from "../api/controllers/BoxController";

function ScanQr() {
  const [api] = notification.useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const { userData } = useContext(AppContext);

  const [data, setData] = useState("");
  const [back] = useState("#FFFFFF");
  const [fore] = useState("#000000");
  const [size] = useState(256);

  const handleQrCodeScanned = (data) => {
    if (location?.state?.isCreatingBox) {
      navigate("/add-package-details", { state: { qrCode: data } });
    } else {
      BoxController.searchBox(data, userData.userId)
        .then((res) => {
          if (res?.boxes?.length > 0) {
            navigate("/add-package-details", {
              state: { boxData: res?.boxes[0] },
            });
          } else {
            api.info({
              message: "Fail",
              description: `No box found for this QR Code!`,
              placement: "topRight",
            });
          }
        })
        .catch((e) => {
          api.error({
            message: "Fail",
            description: e || "Something went wrong!",
            placement: "topRight",
          });
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <QrReader
        constraints={{
          facingMode: "environment",
        }}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            handleQrCodeScanned(result?.text);
          }
          if (!!error) {
            console.info(error);
          }
        }}
        videoContainerStyle={{
          width: "100%",
          borderWidth: 1,
          borderRadius: 10,
        }}
        containerStyle={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      {data && (
        <QRCode
          title="GeeksForGeeks"
          value={data}
          bgColor={back}
          fgColor={fore}
          size={size === "" ? 0 : size}
        />
      )}
    </div>
  );
}

export default ScanQr;
