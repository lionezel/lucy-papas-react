import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../firebase'

export const Menu = () => {

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = () => {
      const resultado = firebase.db.collection('productos').onSnapshot(manejarSnapshot);
      console.log(resultado)
    } 
    obtenerProductos()
  }, [])

  //snapshot nos permite utilizar la base de datos en timepo real de firestore
  function manejarSnapshot(snapshot){

  }


  return (
    <>
    <div>menu</div>
    <Link to="/nuevo-platillo">Agregar platillo</Link>
    </>
  )
}
