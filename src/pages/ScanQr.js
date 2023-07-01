import React, { useRef, useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { notification } from "antd";
import QrReader from "react-qr-reader";
import { useLocation, useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import { BoxController } from "../api/controllers/BoxController";

function ScanQr() {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const { userData, parentCallback } = useContext(AppContext);

  // const qrReaderRef = useRef(null); // Ref to the QR reader component
  const [data, setData] = useState("");
  const [back] = useState("#FFFFFF");
  const [fore] = useState("#000000");
  const [size] = useState(256);
  const [renderQrScanner, setRenderQrScanner] = useState(false);

  const cleanup = async () => {
    // Stop the scanner when unmounting
    if (renderQrScanner) {
      setRenderQrScanner(false);
    }

    // Stop the camera and scanner when unmounting
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    stream.getTracks().forEach(function (track) {
      track.stop();
      track.enabled = false;
    });
    // if (qrReaderRef.current) {
    //   // qrReaderRef.current.stopCamera();
    // }
  };

  useEffect(() => {
    setRenderQrScanner(true);
    return cleanup;
  }, []);

  const handleQrCodeScanned = (data) => {
    setRenderQrScanner(false);
    if (location?.state?.isCreatingBox) {
      api.success({
        message: "Success",
        description: `Scan successfull`,
        placement: "topRight",
      });
      parentCallback({
        qrCode: data,
      });

      // setTimeout(() => {
      //   navigate("/add-package-details");
      // }, 500);
      // navigate("/add-package-details", { state: { qrCode: data } });
    } else {
      BoxController.searchBox(data, userData.userId)
        .then((res) => {
          if (res?.boxes?.length > 0) {
            navigate("/box-details", {
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
    cleanup();
  };
  console.log(
    "🚀 ~ file: ScanQr.js:101 ~ ScanQr ~ renderQrScanner:",
    renderQrScanner
  );

  const handleScan = (data) => {
    if (location?.state?.isCreatingBox) {
      setData(data);
      handleQrCodeScanned(data);
      setTimeout(() => {
        navigate("/add-package-details");
      }, 1000);
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

  const handleError = (err) => {
    console.error(err);
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
      {contextHolder}
      <QrReader
        delay={10000}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "50%" }}
      />
      {data && (
        <QRCode
          title="SSS"
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
