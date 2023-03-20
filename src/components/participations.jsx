import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import Navbar from "./navbar";

import { db, collectionName } from "../firebase-config";

const Participations = () => {
  const [numParticipants, setNumParticipants] = useState(0);
  const [numArrivedParticipants, setNumArrivedParticipants] = useState(0);

  useState(() => {
    const q = query(collection(db, collectionName));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const count = querySnapshot.size;
        setNumParticipants(count);
      },
      []
    );

    return unsubscribe;
  });

  useState(() => {
    const q = query(
      collection(db, collectionName),
      where("isPresent", "==", true)
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const count = querySnapshot.size;
        setNumArrivedParticipants(count);
      },
      []
    );
    return unsubscribe;
  });

  return (
    <div>
      <Navbar />
      <div className="flex flex-row sm:w-3/5 lg:w-1/3 xl:w-2/3 sm:mx-auto">
        <div className="hover:bg-gradient-to-br hover:from-blue-100 bg-gradient-to-br from-zinc-100 to-white text-blue-900 basis-1/3 mx-3 p-12 rounded-lg shadow-lg">
          <p className="text-2xl font-bold">{numParticipants}</p>
          <p className="text-md font-thin">Participants Invited</p>
        </div>
        <div className="hover:bg-gradient-to-br hover:from-green-100 bg-gradient-to-br from-zinc-100 to-white text-green-900 basis-1/3 mx-3 p-12 rounded-lg shadow-lg">
          <p className="text-2xl font-bold">{numArrivedParticipants}</p>
          <p className="text-md font-thin">Participants Arrived</p>
        </div>
        <div className="hover:bg-gradient-to-br hover:from-red-100 bg-gradient-to-br from-zinc-100 to-white text-red-900 basis-1/3 mx-3 p-12 rounded-lg shadow-lg">
          <p className="text-2xl font-bold">
            {numParticipants - numArrivedParticipants}
          </p>
          <p className="text-md font-thin">Participants To Arrive</p>
        </div>
      </div>
    </div>
  );
};

export default Participations;
