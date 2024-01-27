async function obtener_productos (uri_productos,categoria) {
	// Enviar petición de tipo Get
	const productos_resp = await fetch(uri_productos)
	// console.log(productos_resp)
	const productos_json = await productos_resp.json()
	let productos_categoria=[];
	for(i=0;i<productos_json.length;i++){
		if(productos_json[i].categoria.sku==categoria){
			productos_categoria.push(productos_json[i]);
		}
	}
	// console.log(productos_categoria)
	return productos_categoria
}


function mostrar_productos(productos,id_categoria) {
	const categoria=document.getElementById(id_categoria).querySelector("div")
	// console.log(categoria);
	let div_productos=``
	let precioFormateado;
	for(let i=0;i<productos.length;i++){
			precioFormateado = productos[i].precio.toLocaleString('es-ES', {
				// style: 'currency',
				// currency: 'COP',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			});
			div_productos+=`
			<div class="item">
                <span class="titulo-item">English Horse</span>
                <img src="img/englishrose.png" alt="" class="img-item">
                <span class="precio-item">$25.000</span>
                <button class="boton-item">Agregar al Carrito</button>
            </div>
			`
	}
	categoria.innerHTML+=div_productos
	let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(let i=0; i<botonesAgregarAlCarrito.length;i++){
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }
}
async function main(){

	let uri_productos="https://93442a12-da90-4c66-9659-76d6481f89d4.mock.pstmn.io/obtenerProductos";

	const productos_categoria_1 = await obtener_productos(uri_productos,"PX"); // Paneles
	mostrar_productos(productos_categoria_1,"PX");
	
}
main();