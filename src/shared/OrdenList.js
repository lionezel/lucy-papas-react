import { useContext, useState } from "react";
import { FirebaseContext } from "../firebase";

export const OrdenList = ({ orden }) => {
  //State del tiempo de entrega
  const [tiempoentrega, setTiempoentrega] = useState(0);

  //Context de firebase
  const { firebase } = useContext(FirebaseContext);

  //Definir el tiempo de entrega en tiempo real
  const DefinirTiempo = (id) => {
    try {
      firebase.db.collection("ordenes").doc(id).update({ tiempoentrega });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>{orden.id}</div>
      {orden.orden.map((producto) => (
        <p>
          {producto.cantidad} {producto.nombre}
        </p>
      ))}

      <p>Total a pagar: $ {orden.total}</p>

      {orden.tiempoentrega === 0 && (
        <div>
          <label>Tiempo de entrega</label>
          <input
            type="number"
            min="1"
            placeholder="20"
            value={tiempoentrega}
            onChange={(e) => setTiempoentrega(parseInt(e.target.value))}
          />

          <button type="sumbit" onClick={() => DefinirTiempo(orden.id)}>
            Definir tiempo
          </button>
        </div>
      )}

      {orden.tiempoentrega > 0 && (
        <p>
            Tiempo de entrega: 
            <span>{orden.tiempoentrega} Minutos</span>
        </p>
      )}
    </>
  );
};
