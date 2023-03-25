import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import Navbar from "./navbar";

import { db, collectionName } from "../firebase-config";

const Participations = () => {
  const [numParticipants, setNumParticipants] = useState(0);
  const [numArrivedParticipants, setNumArrivedParticipants] = useState(0);

  useEffect(() => {
    const participantsQuery = query(collection(db, collectionName));
    const arrivedParticipantsQuery = query(
      collection(db, collectionName),
      where("isPresent", "==", true)
    );

    const unsubscribe1 = onSnapshot(
      participantsQuery,
      handleParticipantsSnapshot
    );
    const unsubscribe2 = onSnapshot(
      arrivedParticipantsQuery,
      handleArrivedParticipantsSnapshot
    );

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);

  const handleParticipantsSnapshot = (querySnapshot) => {
    const count = querySnapshot.size;
    setNumParticipants(count);
  };

  const handleArrivedParticipantsSnapshot = (querySnapshot) => {
    const count = querySnapshot.size;
    setNumArrivedParticipants(count);
  };

  const numToArrive = numParticipants - numArrivedParticipants;

  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-center gap-4 my-8">
        <div className="bg-blue-100 text-blue-900 rounded-lg shadow-lg p-8">
          <p className="text-2xl font-bold">{numParticipants}</p>
          <p className="text-md font-thin">Participants Invited</p>
        </div>
        <div className="bg-green-100 text-green-900 rounded-lg shadow-lg p-8">
          <p className="text-2xl font-bold">{numArrivedParticipants}</p>
          <p className="text-md font-thin">Participants Arrived</p>
        </div>
        <div className="bg-red-100 text-red-900 rounded-lg shadow-lg p-8">
          <p className="text-2xl font-bold">{numToArrive}</p>
          <p className="text-md font-thin">Participants To Arrive</p>
        </div>
      </div>
    </div>
  );
};

export default Participations;
