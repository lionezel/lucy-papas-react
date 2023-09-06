import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "styled-components";
import { FirebaseContext } from '../firebase/context'

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

  const { firebase } = useContext(FirebaseContext)
  console.log(firebase)

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
      console.log(datos);
    },
  });
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
              <Folder
                id="imagen"
                type="file"
                value={formik.values.imagen}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

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
