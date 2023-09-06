import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../firebase";

export const Menu = () => {
  //Definir el state para los productos
  const [productos, setProductos] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  //Consultar la base de datos al cargar
  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db.collection("productos").onSnapshot(manejarSnapshot);
    };
    obtenerProductos();
  }, []);

  //snapshot nos permite utilizar la base de datos en timepo real de firestore
  function manejarSnapshot(snapshot) {
    const productos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    //Almecenar los resultados en el state
    setProductos(productos);
  }

  return (
    <>
      <div>menu</div>
      <Link to="/nuevo-platillo">Agregar platillo</Link>
    </>
  );
};
