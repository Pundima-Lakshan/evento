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
  onSnapshot,
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
      table: 2,
      isPresent: true,
      isQrChecked: true,
      isCommentsSubmitted: true,
      note: "CJ",
    },
  ]);
  const [prevRequestType, setPrevRequestType] = useState("none");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });

        setParticipants(newData);
      }
    );

    return () => unsubscribe();
  }, []);

  function handleCUD(event) {
    const { requestType, data } = event;

    const applyCUD = async () => {
      if (prevRequestType == "add" && requestType == "save") {
        // code to add a new record
        delete data.id;
        //if (!IsdataValid()) return;
        try {
          await addDoc(collection(db, collectionName), data);
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
              table: data.table,
              isPresent: data.isPresent,
              isQrChecked: data.isQrChecked,
              isCommentsSubmitted: data.isCommentsSubmitted,
              note: data.note,
            },
            { merge: true }
          );
          setPrevRequestType("save");
        } catch (error) {
          alert(error);
        }
      } else if (requestType == "delete") {
        // code to delete record
        try {
          await deleteDoc(doc(db, collectionName, data[0].id));
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
      headerText: "Organization/ Institution",
      textAlign: "Center",
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
      headerText: "Is Feedback Submitted ?",
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
