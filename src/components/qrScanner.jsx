import React, { useState } from "react";
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
  const [guestResultDoc, setGuestResultDoc] = useState({
    id: "documentIDinFirebase",
    qrKeyCode: "12545",
    name: "abc perera",
    designation: "senior pm",
    company: "abc holdings",
    table: "001",
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
      setScanResult(result);
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
        setScanResult("");
      }
    });
  }

  function handleEditBtnClick() {
    setIsInputDisabled((prevValue) => !prevValue);
  }

  function handleUpdateBtnClick(event) {
    event.preventDefault();

    console.log(guestResultDoc);

    const documentRef = doc(db, collectionName, guestResultDoc.id);
    setDoc(
      documentRef,
      {
        qrKeyCode: guestResultDoc.qrKeyCode,
        name: guestResultDoc.name,
        designation: guestResultDoc.designation,
        company: guestResultDoc.company,
        contact: guestResultDoc.contact,
        table: guestResultDoc.table,
        isPresent: guestResultDoc.isPresent,
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

  return (
    <div>
      <Navbar />
      {/* body section */}
      <div className="sm:w-3/5 lg:w-1/3 xl:w-1/4 sm:mx-auto">
        {/* qr cam scanner section */}
        {isScanning && (
          <div className="sm:rounded-lg sm:shadow-xl sm:p-9 sm:h-fit w-screen sm:w-full h-screen bg-gradient-to-tr from-sky-50 to-sky-200 flex flex-col flex-auto items-center">
            <h1 className="font-bold text-sky-900 bg-gradient-to-br from-sky-200 to-sky-100 text-center text-lg justify-items-start w-full py-5 border-b-4 border-sky-600 shadow-xl sm:hidden">
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
                  className="font-bold p-1 px-2 rounded-md shadow"
                />
                <br></br>
                <br></br>

                <br></br>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-sky-500 to-blue-500 font-bold text-white w-full py-3 rounded-lg shadow-md"
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        )}

        {/* qr scanner results section */}
        {!isScanning && (
          <div className="sm:rounded-lg sm:shadow-xl sm:p-9 sm:h-fit w-screen sm:w-full h-screen bg-gradient-to-tr from-green-50 to-green-200 flex flex-col flex-auto items-center">
            <h1 className="font-bold text-green-900 bg-gradient-to-br from-slate-200 to-green-100 text-center text-lg justify-items-start w-full py-5 border-b-4 border-green-600 shadow-xl sm:hidden">
              QR Results
            </h1>

            <form
              onSubmit={handleUpdateBtnClick}
              className="text-green-900 text-left py-12"
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
                  className="bg-gradient-to-r from-green-400 to-green-500 font-bold text-white w-[48%] p-3 rounded-lg shadow-md"
                >
                  Update
                </button>
                {isInputDisabled ? (
                  <button
                    type="button"
                    onClick={handleEditBtnClick}
                    className="bg-transparent font-bold text-green-500 w-[48%] border-4 border-solid border-green-500 p-2 rounded-lg shadow-md"
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
