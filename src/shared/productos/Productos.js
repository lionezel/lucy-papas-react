import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const ProductoCard = ({ producto }) => {
  const { nombre, imagen, existencia, categoria, precio, descripcion } = producto;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imagen}
        title="green iguana"
      />
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
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
