import React, { useRef, useContext, useEffect } from "react";
import { notification } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { BrowserQRCodeReader } from "@zxing/library";

import { AppContext } from "../context/AppContext";
import { BoxController } from "../api/controllers/BoxController";

function ScanQr() {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);

  const { userData, currentValues, parentCallback } = useContext(AppContext);

  const handleQrCodeScanned = (data) => {
    if (location?.state?.isCreatingBox) {
      api.success({
        message: "Success",
        description: `Scan successfull`,
        placement: "topRight",
      });
      parentCallback({
        ...currentValues,
        qrCode: data,
      });
      setTimeout(() => {
        navigate("/add-package-details");
      }, 1000);
    } else {
      BoxController.searchBox(data, userData.userId)
        .then((res) => {
          if (res?.boxes?.length > 0) {
            api.success({
              message: "Success",
              description: `Box found!`,
              placement: "topRight",
            });
            navigate("/box-details", {
              state: { boxData: res?.boxes[0] },
            });
          } else {
            api.info({
              message: "Info",
              description: `No box found for this QR Code!`,
              placement: "topRight",
            });
          }
        })
        .catch((e) => {
          api.error({
            message: "Fail",
            description: e?.message || "Something went wrong!",
            placement: "topRight",
          });
        });
    }
  };

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    codeReader
      .decodeOnceFromVideoDevice(undefined, videoRef.current)
      .then((result) => {
        handleQrCodeScanned(result.text);
        // Handle the scanned result
      })
      .catch((err) => {
        console.error(err);
        // Handle any errors
      });

    return () => {
      codeReader.reset();
      codeReader.stopStreams();
      codeReader._destroyVideoElement();
      codeReader.stopContinuousDecode();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {contextHolder}
      <video ref={videoRef} style={{ width: "100%", borderRadius: 6 }} />
    </div>
  );
}

export default ScanQr;
