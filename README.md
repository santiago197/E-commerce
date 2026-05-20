# Ejercicio Práctico:
• Consigna: Desarrollar una aplicación e-commerce en React para vender productos de un 
rubro a elección (por ejemplo: libros, ropa, tecnología, comida, etc.).
• La app debe permitir:
o Ver un catálogo de productos.
o Ver el detalle de un producto.
o Agregar productos al carrito.
o Ver un resumen de compra.
• Componentes:
1. NavBar
Descripción: Componente de navegación ubicado en la parte superior. Debe incluir al menos:
* Logo de la tienda.
* Link al Home (catálogo).
* Link al carrito (CartWidget).
2. CartWidget
Descripción: Ícono o botón que muestre la cantidad de productos agregados al carrito. Al 
hacer clic, debe redirigir al resumen de compra (Brief o Checkout).
3. ItemListContainer
Descripción: Componente contenedor que recibe una categoría o saludo como prop y se 
encarga de solicitar (mockear) los datos de productos. Renderiza el componente ItemList.
4. ItemList
Descripción: Recibe un array de productos como prop y renderiza una lista de Item (puede 
ser una card o preview).
5. Item
Descripción: Componente representando un producto individual, con imagen, nombre, 
precio y un botón para ver más.
6. ItemDetailContainer
Descripción: Contenedor que, según el ID del producto en la URL, busca los datos del 
producto y renderiza el componente ItemDetail.
7. ItemDetail
Descripción: Muestra información detallada del producto (imagen, nombre, precio, 
descripción). Incluye el ItemQuantitySelector.
8. ItemQuantitySelector
Descripción: Permite al usuario seleccionar la cantidad de productos que desea agregar al 
carrito. Debe incluir:
Botón para aumentar/disminuir cantidad.
Botón AddItemButton para confirmar la adición al carrito.
9. AddItemButton
Descripción: Botón que al hacer clic agrega la cantidad seleccionada del producto al carrito 
utilizando el CartContext.
10. CartContext
Descripción: Contexto global para manejar el estado del carrito de compras con useContext. 
Debe permitir:
* Agregar productos.
* Eliminar productos.
* Consultar productos actuales.
* Calcular total y cantidad total.
11. Checkout
Descripción: Vista final para confirmar la compra. Muestra los productos agregados, sus 
cantidades y el total a pagar. Puede incluir un botón para “Finalizar compra”.
12. Brief (resumen de compra)
Descripción: Componente que muestra el detalle de los productos agregados, cantidades y 
subtotal por ítem. Se puede mostrar dentro de Checkout.
• Requisitos técnicos mínimos:
o Usar componentes react-bootstrap e iconos font awesome
o Usar React con hooks.
o Usar useContext para el carrito.
o Uso adecuado de props y estado.
o Buen manejo del árbol de componentes.
o Realizar llamadas a API de datos.
o Código limpio, bien indentado, con comentarios donde sea necesario