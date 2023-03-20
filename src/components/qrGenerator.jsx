import React, { useState, useRef } from "react";

import PlaceholderImage from "../data/placeholder-qr.png";

import Navbar from "./navbar";

import QRCode from "qrcode";
import QrReader from "react-qr-reader";

const QrGenerator = () => {
  // qr generator code
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    generateQrCode();
  };

  // webcam scanner code
  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  const handleConfirmBtnClick = () => {
    setVisitedGuest(scanResultWebCam);
  };

  // file scan code
  const [scanResultFile, setScanResultFile] = useState("");
  const qrRef = useRef(null);

  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };

  return (
    <div>
      <Navbar />
      <div className="w-4/5 mx-auto grid grid-cols-3 gap-5">
        {/* qr generator */}
        <div className="shadow-lg bg-gradient-to-br from-zinc-100 to-white hover:bg-gradient-to-br hover:from-blue-100 p-8 rounded-lg flex flex-col align-middle justify-between">
          <h3 className="text-center font-bold text-lg text-sky-900 h-9">
            Generate QR
          </h3>

          <form onSubmit={handleInputSubmit} className="flex flex-col">
            <label htmlFor="text" className="">
              Enter the QR Key Code
            </label>
            <input
              className="justify-content-center w-[80%] text-left p-3 rounded-lg mt-5"
              type="text"
              id="text"
              value={text}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="mt-3 bg-gradient-to-br from-sky-700 to-sky-500 shadow-lg hover:bg-sky-500 p-3 text-white font-400 rounded-lg max-w-fit"
            >
              Generate
            </button>
          </form>

          {imageUrl ? (
            <a href={imageUrl} download>
              <img
                src={imageUrl}
                alt="img"
                className="block mx-auto rounded-lg"
              />
            </a>
          ) : (
            <img
              src={PlaceholderImage}
              alt="placeholder img"
              className="block mx-auto rounded-lg"
            />
          )}

          <h6 className="text-center text-sky-600">
            click on the image to download
          </h6>
        </div>

        {/* qr file scanner */}
        <div className="shadow-lg bg-gradient-to-br from-zinc-100 to-white hover:bg-gradient-to-br hover:from-red-100 p-9 rounded-lg flex flex-col align-middle justify-between">
          <h3 className="text-center font-bold text-lg text-red-900 h-9">
            Scan QR From File
          </h3>

          <h3 className="font-bold text-red-900 text-center">
            {scanResultFile}
          </h3>

          <QrReader
            ref={qrRef}
            delay={300}
            style={{
              width: "200px",
              alignSelf: "center",
              borderRadius: "0.5rem",
            }}
            onError={handleErrorFile}
            onScan={handleScanFile}
            legacyMode
          />

          <button
            onClick={onScanFile}
            className="bg-gradient-to-br from-red-700 to-red-500 shadow-lg hover:bg-red-500 p-3 text-white font-400 rounded-lg max-w-fit self-center"
          >
            Select
          </button>
        </div>

        {/* qr webcam scanner */}
        <div className="shadow-lg bg-gradient-to-br from-zinc-100 to-white hover:bg-gradient-to-br hover:from-green-100 p-9 rounded-lg flex flex-col align-middle justify-between">
          <h3 className="text-center font-bold text-lg text-green-900 h-9">
            Scan QR From Camera
          </h3>

          <h3 className="font-bold text-green-900 text-center">
            {scanResultWebCam}
          </h3>

          <QrReader
            delay={300}
            style={{
              width: "250px",
              alignSelf: "center",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
            showViewFinder={false}
          />

          <button
            onClick={handleConfirmBtnClick}
            className="mt-3 bg-gradient-to-br from-green-700 to-green-500 shadow-lg hover:bg-green-500 p-3 text-white font-400 rounded-lg max-w-fit self-center"
          >
            {" "}
            Confirm{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;
