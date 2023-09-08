import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";
import { OrdenList } from "../../shared/OrdenList";

export const Ordenes = () => {
  //Context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  //State con las ordenes
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const obtenerOrdenes = () => {
      firebase.db
        .collection("ordenes")
        .where("completado", "==", false)
        .onSnapshot(manejarSnaphot);
    };
    obtenerOrdenes();
  }, []);

  function manejarSnaphot(snapshot) {
    const ordenes = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setOrdenes(ordenes);
  }

  return (
    <>
      <div>ordenes</div>
      {ordenes.map((orden) => (
        <OrdenList key={orden.id} orden={orden} />
      ))}
    </>
  );
};
