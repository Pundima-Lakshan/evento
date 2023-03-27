import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import Navbar from "./navbar";
import {
  getDocs,
  setDoc,
  query,
  where,
  collection,
  doc,
} from "@firebase/firestore";

import { db, collectionName, fieldName } from "../firebase-config";

const QrScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isConfirmBtnClicked, setIsConfirmBtnlicked] = useState(false);
  const [guestResultDoc, setGuestResultDoc] = useState({
    id: "10248",
    qrKeyCode: "125df",
    name: "VINET",
    designation: "PM",
    company: "abc company",
    table: 2,
    isPresent: true,
    isQrChecked: true,
    isCommentsSubmitted: true,
    note: "CJ",
  });

  async function getGuestResultDoc(fieldValue) {
    const q = query(
      collection(db, collectionName),
      where(fieldName, "==", fieldValue)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        alert(`No guest with the code "${fieldValue}"`);
        return null;
      }

      const docs = querySnapshot.docs.map((doc) => {
        let data = doc.data();
        data.id = doc.id;
        return data;
      });

      const doc = docs[0];
      return doc;
    } catch {
      (error) => {
        alert(error);
      };
    }
  }

  function handleErrorWebCam(error) {
    alert(error);
  }

  function handleScanWebCam(result) {
    if (result) {
      // Split the URL string into an array of substrings using the "/" character as a delimiter
      const urlParts = result.toString().split("/");

      // Get the last element of the array, which contains the file name and extension
      const fileNameWithExtension = urlParts[urlParts.length - 1]; // "B1.jpg"

      // Split the file name and extension into an array using the "." character as a delimiter
      const fileNameParts = fileNameWithExtension.split(".");

      // Get the first element of the array, which contains the file name without the extension
      const res = fileNameParts[0]; // "B1"
      setScanResult(res);
    }
  }

  function handleConfirmBtnClick(event) {
    event.preventDefault();

    if (scanResult === "") {
      return;
    }

    getGuestResultDoc(scanResult).then((result) => {
      if (result !== null) {
        setGuestResultDoc(() => result);
        setIsScanning((prevValue) => !prevValue);
        setIsConfirmBtnlicked(false);
        setScanResult("");
        setIsConfirmBtnlicked(true);
      }
    });
  }

  function handleEditBtnClick() {
    setIsInputDisabled((prevValue) => !prevValue);
  }

  function handleUpdateBtnClick(event) {
    event.preventDefault();

    const documentRef = doc(db, collectionName, guestResultDoc.id);
    setDoc(
      documentRef,
      {
        qrKeyCode: guestResultDoc.qrKeyCode,
        name: guestResultDoc.name,
        designation: guestResultDoc.designation,
        company: guestResultDoc.company,
        table: guestResultDoc.table,
        isPresent: true,
        isQrChecked: guestResultDoc.isQrChecked,
        isCommentsSubmitted: guestResultDoc.isCommentsSubmitted,
        note: guestResultDoc.note,
      },
      { merge: true }
    )
      .then(() => {
        setIsInputDisabled(() => true);
        setIsScanning((prevValue) => !prevValue);
      })
      .catch((error) => alert(error));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setGuestResultDoc((prevGuestResultDoc) => {
      return {
        ...prevGuestResultDoc,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    if (isScanning) return;
    const documentRef = doc(db, collectionName, guestResultDoc.id);
    setDoc(
      documentRef,
      {
        isQrChecked: true,
      },
      { merge: true }
    ).catch((error) => alert(error));
    guestResultDoc.isQrChecked = true;
  }, [isConfirmBtnClicked]);

  return (
    <div>
      <Navbar />
      {/* body section */}
      <div className="sm:w-3/5 lg:w-1/3 xl:w-1/4 sm:mx-auto">
        {/* qr cam scanner section */}
        {isScanning && (
          <div className="sm:rounded-lg sm:shadow-xl sm:p-9 sm:h-fit w-screen sm:w-full h-screen bg-gradient-to-br from-zinc-100 to-white hover:bg-gradient-to-br hover:from-blue-100 flex flex-col flex-auto items-center">
            <h1 className="font-bold text-sky-900 bg-gradient-to-br from-slate-200 to-white text-center text-md justify-items-start w-full py-5 shadow-lg sm:hidden">
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
                className="text-sky-700 text-left"
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
                  disabled={!isInputDisabled}
                  className="text-lg font-bold p-1 px-2 rounded-md shadow"
                />
                <br></br>
                <br></br>

                <br></br>

                <button
                  type="submit"
                  className="text-base bg-gradient-to-r from-sky-500 to-blue-500 font-bold text-white w-full py-3 rounded-lg shadow-md"
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        )}

        {/* qr scanner results section */}
        {!isScanning && (
          <div className="sm:rounded-lg sm:shadow-xl sm:p-9 sm:h-fit w-screen sm:w-full h-screen hover:bg-gradient-to-br hover:from-green-100 flex flex-col flex-auto items-center">
            <h1 className="font-bold text-green-900 bg-gradient-to-br from-slate-200 to-white text-center text-md justify-items-start w-full py-5 shadow-lg sm:hidden">
              QR Results
            </h1>

            <form
              onSubmit={handleUpdateBtnClick}
              className="text-green-900 text-left text-lg py-12"
            >
              <label
                htmlFor="qrKeyCode"
                className="font-thin text-sm opacity-40"
              >
                QR Key Code
              </label>
              <br></br>
              <input
                id="qrKeyCode"
                name="qrKeyCode"
                value={guestResultDoc.qrKeyCode}
                onChange={handleChange}
                disabled={isInputDisabled}
                className="font-bold p-1 my-1 px-2 rounded-md shadow focus:py-2 focus:my-0 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-green-700"
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
                value={guestResultDoc.name}
                onChange={handleChange}
                disabled={isInputDisabled}
                className="font-bold p-1 my-1 px-2 rounded-md shadow focus:py-2 focus:my-0 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-green-700"
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
                value={guestResultDoc.designation}
                onChange={handleChange}
                disabled={isInputDisabled}
                className="font-bold p-1 my-1 px-2 rounded-md shadow focus:py-2 focus:my-0 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-green-700"
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
                value={guestResultDoc.company}
                onChange={handleChange}
                disabled={isInputDisabled}
                className="font-bold p-1 my-1 px-2 rounded-md shadow focus:py-2 focus:my-0 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-green-700"
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
                value={guestResultDoc.table}
                onChange={handleChange}
                disabled={isInputDisabled}
                className="font-bold p-1 my-1 px-2 rounded-md shadow focus:py-2 focus:my-0 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-red-700 text-red-700"
              />
              <br></br>
              <br></br>

              <br></br>

              <div className="flex flex-row justify-between">
                <button
                  type="submit"
                  className="text-base bg-gradient-to-r from-green-400 to-green-500 font-bold text-white w-[48%] p-3 rounded-lg shadow-md"
                >
                  Update
                </button>
                {isInputDisabled ? (
                  <button
                    type="button"
                    onClick={handleEditBtnClick}
                    className="text-base bg-transparent font-bold text-green-500 w-[48%] border-4 border-solid border-green-500 p-2 rounded-lg shadow-md"
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
