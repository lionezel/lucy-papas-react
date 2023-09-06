import React from "react";

export const NuevoPlatillo = () => {
  return (
    <>
      <div>nuevoPlatillo</div>

      <div>
        <div>
          <form>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                placeholder="Nombre del producto"
              />
            </div>
            <div>
              <label htmlFor="precio">Precio</label>
              <input id="precio" type="number" placeholder="$20" min="0" />
            </div>
            <div>
              <label htmlFor="precio">Categoria</label>
              <select name="categoria">
                <option value="">Selecciones</option>
                <option value="hamburguesa">Hamburguesa</option>
                <option value="salchipapas">Salchipapas</option>
                <option value="bebidas">Bebidas</option>
              </select>
            </div>
            <div>
              <label htmlFor="imagen">Imagen</label>
              <input id="imagen" type="file" />
            </div>
            <div>
              <label htmlFor="descripcion">Descripcion</label>
              <textarea
                id="descripcion"
                placeholder="Descripcion del producto"
              ></textarea>
            </div>
            <input type="submit" value="Agregar producto" />
          </form>
        </div>
      </div>
    </>
  );
};
