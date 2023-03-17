import React, { useState } from "react";
import QrReader from "react-qr-reader";
import Navbar from "./navbar";

const QrScanner = () => {
  const [scanResult, setScanResult] = useState(" ");
  const [isScanning, setIsScanning] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [guestResult, setGuestResult] = useState({
    qrCode: "12545",
    name: "abc perera",
    company: "abc holdings",
    designation: "senior pm",
    table: "001",
  });

  function handleErrorWebCam(error) {
    console.log(error);
    alert(error);
  }

  function handleScanWebCam(result) {
    if (result) {
      setScanResult(result);
    }
  }

  function handleConfirmBtnClick(event) {
    event.preventDefault();

    if (scanResult === "") {
      return;
    }

    setIsScanning((prevValue) => !prevValue);
    setScanResult("");
  }

  function handleEditBtnClick() {
    setIsInputDisabled((prevValue) => !prevValue);
  }

  function handleUpdateBtnClick(event) {
    event.preventDefault();
    setIsInputDisabled(() => true);
    setIsScanning((prevValue) => !prevValue);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setGuestResult((prevGuestResult) => {
      return {
        ...prevGuestResult,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <Navbar />
      {/* body section */}
      <div className="sm:w-1/4 sm:mx-auto">
        {/* qr cam scanner section */}
        {isScanning && (
          <div className="w-screen sm:w-full h-screen bg-sky-100 sm:bg-white flex flex-col flex-auto items-center">
            <h1 className="font-bold text-sky-900 bg-slate-200 text-center text-lg justify-items-start w-full py-5 border-b-4 rounded-lg border-sky-600 shadow-xl sm:hidden">
              QR CamScanner
            </h1>
            <div className="w-full row-span-2 py-12">
              <QrReader
                delay={200}
                style={{
                  width: "100%",
                  margin: "0 auto",
                }}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
                showViewFinder={false}
              />
            </div>

            <div>
              <form
                onSubmit={handleConfirmBtnClick}
                className="text-orange-700 text-left"
              >
                <label
                  htmlFor="scanResult"
                  className="font-thin text-sm opacity-40"
                >
                  Scan Result
                </label>
                <br></br>
                <input
                  id="scanResult"
                  name="scanResult"
                  value={scanResult}
                  onChange={handleChange}
                  disabled={isInputDisabled}
                  className="font-bold p-1 px-2 rounded-lg shadow"
                />
                <br></br>
                <br></br>

                <br></br>

                <button
                  type="submit"
                  className="bg-sky-500 font-bold text-white w-full py-3 rounded-lg hover:bg-sky-700 active:bg-sky-700 shadow-md"
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        )}

        {/* qr scanner results section */}
        {!isScanning && (
          <div className="w-screen sm:w-full h-screen bg-green-100 sm:bg-white flex flex-col flex-auto items-center">
            <h1 className="font-bold text-green-900 bg-slate-200 text-center text-lg justify-items-start w-full py-5 border-b-4 rounded-lg border-green-600 shadow-xl sm:hidden">
              QR Results
            </h1>

            <form
              onSubmit={handleUpdateBtnClick}
              className="text-green-900 text-left py-12"
            >
              <label htmlFor="qrCode" className="font-thin text-sm opacity-40">
                QR Code
              </label>
              <br></br>
              <input
                id="qrCode"
                name="qrCode"
                value={guestResult.qrCode}
                onChange={handleChange}
                disabled={isInputDisabled}
                className="font-bold p-1 my-1 px-2 rounded-lg shadow focus:py-2 focus:my-0 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-green-700"
              />
              <br></br>
              <br></br>

              <label htmlFor="name" className="font-thin text-sm opacity-40">
                Name
              </label>
              <br></br>
              <input
                id="name"
                name="name"
                value={guestResult.name}
                onChange={handleChange}
                disabled={isInputDisabled}
                className="font-bold p-1 my-1 px-2 rounded-lg shadow focus:py-2 focus:my-0 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-green-700"
              />
              <br></br>
              <br></br>

              <label
                htmlFor="designation"
                className="font-thin text-sm opacity-40"
              >
                Designation
              </label>
              <br></br>
              <input
                id="designation"
                name="designation"
                value={guestResult.designation}
                onChange={handleChange}
                disabled={isInputDisabled}
                className="font-bold p-1 my-1 px-2 rounded-lg shadow focus:py-2 focus:my-0 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-green-700"
              />
              <br></br>
              <br></br>

              <label htmlFor="company" className="font-thin text-sm opacity-40">
                Company
              </label>
              <br></br>
              <input
                id="company"
                name="company"
                value={guestResult.company}
                onChange={handleChange}
                disabled={isInputDisabled}
                className="font-bold p-1 my-1 px-2 rounded-lg shadow focus:py-2 focus:my-0 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-green-700"
              />
              <br></br>
              <br></br>

              <label
                htmlFor="table"
                className="font-thin text-sm opacity-40 text-red-700"
              >
                Table Number
              </label>
              <br></br>
              <input
                id="table"
                name="table"
                value={guestResult.table}
                onChange={handleChange}
                disabled={isInputDisabled}
                className="font-bold p-1 my-1 px-2 rounded-lg shadow focus:py-2 focus:my-0 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-red-700 text-red-700"
              />
              <br></br>
              <br></br>

              <br></br>

              <div className="flex flex-row justify-between">
                <button
                  type="submit"
                  className="bg-green-500 font-bold text-white w-[48%] p-3 rounded-lg hover:bg-green-700 active:bg-green-700 shadow-md"
                >
                  Update
                </button>
                {isInputDisabled ? (
                  <button
                    type="button"
                    onClick={handleEditBtnClick}
                    className="bg-transparent font-bold text-green-500 w-[48%] border-4 border-solid border-green-500 p-2 rounded-lg hover:border-green-700 hover:bg-green-700 active:border-green-700 active:bg-green-700 hover:text-white shadow-md"
                  >
                    Edit
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrScanner;
