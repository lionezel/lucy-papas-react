export const OrdenList = ({ orden }) => {
    return ( 
        <>
        <div>{orden.id}</div>
        {orden.orden.map(producto => (
            <p>{producto.cantidad}  {producto.nombre}</p>
        ))}

        <p>Total a pagar: $ {orden.total}</p>

        {orden.tiempoentrega === 0 && (
            <div>
                <label>Tiempo de entrega</label>
                <input 
                    type="number"
                    min="1"
                    placeholder="20"
                />

                <button
                    type="sumbit"
                >
                    Definir tiempo
                </button>
            </div>
        )}
        </>
     );
}
 