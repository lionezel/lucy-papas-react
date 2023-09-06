import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "styled-components";
import { FirebaseContext } from "../firebase/context";
import { useNavigate } from "react-router";
import FileUploader from "react-firebase-file-uploader";

const Container = styled.div`
  padding-left: 30%;
  padding-right: 30%;
`;

const FormContent = styled.div``;

const Label = styled.label`
  display: block;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
`;

const Folder = styled.input`
  width: 100%;
  border: 1px solid #111;
  padding: 5px;
`;

const Errors = styled.div`
  color: red;
  margin-top: 10px;
`;

export const NuevoPlatillo = () => {
  //state para las imagenes
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlImagen, setUrlImagen] = useState("");

  //Context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  //Hook para redireccionar
  const navigate = useNavigate();

  //Validar y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      categoria: "",
      imagen: "",
      descripcion: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "Los productos deben tener al menos 3 caracteres")
        .required("Nombre es oblogatorio"),
      precio: Yup.number()
        .min(1, "Debes agregar un numero")
        .required("El precio es obligatorio"),
      categoria: Yup.string().required("La categoria es obligatorio"),
      descripcion: Yup.string()
        .min(10, "La descripcion debe ser mas larga")
        .required("La descripcion es obligatorio"),
    }),
    onSubmit: (datos) => {
      try {
        datos.existencia = true;
        datos.imagen = urlImagen;
        firebase.db.collection("productos").add(datos);

        navigate("/menu");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };
  const handleUploadError = (error) => {
    setSubiendo(false);
    console.log(error);
  };
  const handleUploadSuccess = async (nombre) => {
    setProgreso(100);
    setSubiendo(false);

    //Almacenar la URL del destino

    const url = await firebase.storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL();

    console.log(url);
    setUrlImagen(url);
  };
  const handleProgress = (progreso) => {
    setProgreso(progreso);
    console.log(progreso);
  };

  return (
    <>
      <div>nuevoPlatillo</div>

      <Container>
        <FormContent>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Nombre del producto"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.nombre && formik.errors.nombre ? (
              <Errors>
                <p>{formik.errors.nombre}</p>
              </Errors>
            ) : null}
            <div>
              <Label htmlFor="precio">Precio</Label>
              <Input
                id="precio"
                type="number"
                placeholder="$20"
                min="0"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.precio && formik.errors.precio ? (
              <Errors>
                <p>{formik.errors.precio}</p>
              </Errors>
            ) : null}
            <div>
              <Label htmlFor="precio">Categoria</Label>
              <Select
                name="categoria"
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Selecciones</option>
                <option value="hamburguesa">Hamburguesa</option>
                <option value="salchipapas">Salchipapas</option>
                <option value="bebidas">Bebidas</option>
              </Select>
            </div>
            {formik.touched.categoria && formik.errors.categoria ? (
              <Errors>
                <p>{formik.errors.categoria}</p>
              </Errors>
            ) : null}
            <div>
              <Label htmlFor="imagen">Imagen</Label>
              <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={firebase.storage.ref("productos")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </div>

              { subiendo && (
                <div>
                  <div style={{ width: `${progreso}%` }}>{progreso} %</div>
                </div>
              ) }

              { urlImagen && (
                <p>La imagen se subio correctamente</p>
              ) }

            <div>
              <Label htmlFor="descripcion">Descripcion</Label>
              <textarea
                id="descripcion"
                placeholder="Descripcion del producto"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.descripcion && formik.errors.descripcion ? (
                <Errors>
                  <p>{formik.errors.descripcion}</p>
                </Errors>
              ) : null}
            </div>
            <Input type="submit" value="Agregar producto" />
          </form>
        </FormContent>
      </Container>
    </>
  );
};
