import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Edit,
  Filter,
  Inject,
  Page,
  Search,
  Sort,
  Toolbar,
  ExcelExport,
} from "@syncfusion/ej2-react-grids";

import {
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

import Navbar from "./navbar";
import { collectionName, db } from "../firebase-config";

const Participants = () => {
  const [participants, setParticipants] = useState([
    {
      id: "10248",
      qrKeyCode: "125df",
      name: "VINET",
      designation: "PM",
      company: "abc company",
      contact: 123456789,
      table: 2,
      isPresent: true,
      isQrChecked: true,
      isCommentsSubmitted: true,
      note: "CJ",
    },
  ]);
  const [prevRequestType, setPrevRequestType] = useState("none");
  const [isUpdate, setIsUpdate] = useState(false);

  const fetchParticipantRecords = async () => {
    await getDocs(collection(db, collectionName)).then((participantsFromDb) => {
      const newData = participantsFromDb.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      setParticipants(newData);
      setIsUpdate(false);
    });
  };

  useEffect(() => {
    fetchParticipantRecords();
  }, [isUpdate]);

  function handleCUD(event) {
    const { requestType, data } = event;

    // const IsdataValid = () => {
    //   if (data === undefined) return false;
    //   for (let [key, value] of Object.entries(data)) {
    //     switch (key) {
    //       case "id":
    //       case "qrKeyCode":
    //       case "name":
    //       case "designation":
    //       case "company":
    //       case "note": {
    //         const pattern = /^.+$/;
    //         if (pattern.test(value)) {
    //           return true;
    //         }
    //         break;
    //       }
    //       case "contact": {
    //         const pattern = /^[1-9]\d{9}$/;
    //         if (!pattern.test(value)) {
    //           return true;
    //         }
    //         break;
    //       }
    //       case "table": {
    //         const pattern = /^(0|[1-9]\d{0,1}|2[0-9]{1,2}|300)$/;
    //         if (!pattern.test(value)) {
    //           return true;
    //         }
    //         break;
    //       }
    //       case "isPresent":
    //       case "isQrChecked":
    //       case "isCommentsSubmitted":
    //         if (typeof value !== "boolean") {
    //           return true;
    //         }
    //         break;
    //       default: {
    //         alert(`no key named ${key}`);
    //       }
    //     }
    //     alert(`wrong input in ${key}`);
    //   }
    // };

    const applyCUD = async () => {
      if (prevRequestType == "add" && requestType == "save") {
        // code to add a new record
        delete data.id;
        //if (!IsdataValid()) return;
        try {
          await addDoc(collection(db, collectionName), data);
          setIsUpdate(true);
          setPrevRequestType("save");
        } catch (error) {
          alert(error);
        }
      } else if (prevRequestType == "beginEdit" && requestType == "save") {
        // code to update record
        //if (!IsdataValid()) return;
        try {
          await setDoc(
            doc(db, collectionName, data.id),
            {
              qrKeyCode: data.qrKeyCode,
              name: data.name,
              designation: data.designation,
              company: data.company,
              contact: data.contact,
              table: data.table,
              isPresent: data.isPresent,
              isQrChecked: data.isQrChecked,
              isCommentsSubmitted: data.isCommentsSubmitted,
              note: data.note,
            },
            { merge: true }
          );
          setIsUpdate(true);
          setPrevRequestType("save");
        } catch (error) {
          alert(error);
        }
      } else if (requestType == "delete") {
        // code to delete record
        try {
          await deleteDoc(doc(db, collectionName, data[0].id));
          setIsUpdate(true);
          setPrevRequestType("delete");
        } catch (error) {
          alert(error);
        }
      } else {
        requestType
          ? setPrevRequestType(requestType.toString())
          : alert("grid action returns error");
      }
    };

    applyCUD();
  }

  const numericParams = { params: { decimals: 0 } };
  const booleanParam = { params: { checked: true } };

  const participantsColumns = [
    {
      field: "id",
      headerText: "ID",
      textAlign: "Center",
      isPrimaryKey: "true",
    },
    {
      field: "qrKeyCode",
      headerText: "QR Key Code",
      textAlign: "Center",
    },
    {
      field: "name",
      headerText: "Name",
      textAlign: "Center",
    },
    {
      field: "designation",
      headerText: "Designation",
      textAlign: "Center",
    },
    {
      field: "company",
      headerText: "Company",
      textAlign: "Center",
    },
    {
      field: "contact",
      headerText: "Contact",
      textAlign: "Center",
      edit: "numericParams",
    },
    {
      field: "table",
      headerText: "Table No.",
      textAlign: "Center",
      edit: "numericParams",
    },
    {
      field: "isPresent",
      headerText: "Is Present ?",
      textAlign: "Center",
      editType: "booleanedit",
      edit: "booleanParam",
      displayAsCheckBox: "true",
    },
    {
      field: "isQrChecked",
      headerText: "Is QR Scanned ?",
      textAlign: "Center",
      editType: "booleanedit",
      edit: "booleanParam",
      displayAsCheckBox: "true",
    },
    {
      field: "isCommentsSubmitted",
      headerText: "Is Comments Submitted ?",
      textAlign: "Center",
      editType: "booleanedit",
      edit: "booleanParam",
      displayAsCheckBox: "true",
    },
    {
      field: "note",
      headerText: "Notes",
      textAlign: "Justify",
    },
  ];

  const pageOptions = {
    pageSize: 15,
    pageSizes: true,
  };

  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };

  const toolbarOptions = [
    "Add",
    "Edit",
    "Delete",
    "Update",
    "Cancel",
    "Search",
    "ExcelExport",
  ];

  let grid;
  const toolbarClick = (args) => {
    if (grid && args.item.id === "grid_excelexport") {
      grid.excelExport();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-4/5 mx-auto shadow-xl">
        <GridComponent
          id="grid"
          dataSource={participants}
          enableStickyHeader={true}
          allowPaging={true}
          pageSettings={pageOptions}
          allowFiltering={true}
          allowSorting={true}
          allowTextWrap={true}
          editSettings={editOptions}
          toolbar={toolbarOptions}
          actionComplete={handleCUD}
          allowExcelExport={true}
          toolbarClick={toolbarClick}
          ref={(g) => (grid = g)}
        >
          <ColumnsDirective>
            {participantsColumns.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>

          <Inject
            services={[Edit, Toolbar, Search, Page, Filter, Sort, ExcelExport]}
          />
        </GridComponent>
      </div>
    </div>
  );
};

export default Participants;
