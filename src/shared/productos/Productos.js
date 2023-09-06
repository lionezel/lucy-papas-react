import React, { useContext, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FirebaseContext } from "../../firebase";

export const ProductoCard = ({ producto }) => {
  //Existencia ref para acceder al vbalor directamente
  const existenciaRef = useRef(producto.existencia);

  //Context de firebase para combios de la db
  const { firebase } = useContext(FirebaseContext);

  //Modificar el estado del produto en firebase
  const actualizarDisponibilidad = () => {
    const existencia = existenciaRef.current.value === "true";

    try {
      firebase.db.collection("productos").doc(id).update({ existencia });
    } catch (error) {
      console.log(error);
    }
    console.log(existencia);
  };

  const { id, nombre, imagen, existencia, categoria, precio, descripcion } =
    producto;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={imagen} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nombre}
        </Typography>
        <Typography gutterBottom variant="h9" component="div">
          {categoria}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {descripcion}
        </Typography>
      </CardContent>
      <Typography gutterBottom variant="h9" component="div">
        <label>
          <span>existencia</span>
          <select
            value={existencia}
            ref={existenciaRef}
            onChange={() => actualizarDisponibilidad()}
          >
            <option value="true">Disponible</option>
            <option value="false">No disponible</option>
          </select>
        </label>
      </Typography>
    </Card>
  );
};
