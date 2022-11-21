//Identificamos los elementos que nesecitamos para crear las funcionalidades
//Los llamamos con querySelector y los guardamos dentro de una variable

//Elementos del carrito
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = []; // Creamos un array vacio, donde se almacenaran los cursos seleccionados

//Conntenedor de los elementos que podriamos agregar al carrito
const listaCursos = document.querySelector('#lista-cursos');


//Creamos una funcion que contenga todos los eventos
cargarEventListeners();
function cargarEventListeners () {
    
    listaCursos.addEventListener('click', agregarCarrito) // Evento para agregar al carrito con un click
    
    carrito.addEventListener('click', eliminarCurso)
    
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reseteamos el arreglo

        limpiarHTML(); // Eliminamos todo el HTML
    })
}

//sector donde daremos funcionalidad a las funciones contenidas en los eventos

function agregarCarrito(e) {
    
    e.preventDefault(); // evita que las acciones por default se ejecuten, se utiliza en este caso para evitar que cuando se interatue con enlaces vacios, estos te evien al comienzo de la pagina. De esta forma no hacen nada
    //    console.log(e.target.classList)       // e.target.classList, (revisar eventos/bubbling) nos permite conocer las clases de los elementos que clickamos. Con esta informacion podemos armar una estructura que se centre especificamente en la clase que buscamos.
    
    if(e.target.classList.contains('agregar-carrito')){ //Al utilizar el metodo, logramos identificar la clase .agregar-carrito , con esta informacion creamos un if, el cual limita al evento a realizar una accion SOLO si se interactua con el elemento que contiene la clase objetivo.
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso (cursoSeleccionado);
    }
}

//elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        //Elimina del arregle de articuloscarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        
        carritohtml(); // Iterar sobre el carrito y mostrar su HTML
    }
}


//Leer el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso (curso){
    
    console.log(curso);
    
    //Crear objeto con informacion de los cursos
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si unelemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else{
                return curso; // retorna los objetos que son los duplicados
            }
        } );
        articulosCarrito = [...cursos];
    } else {
        //agregar elemetos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso] //Es importante siempre agregar una copia del array, para que los elementos se sigan aniadiendo, en lugar de reemplazarse.
    }
    
    //console.log(articulosCarrito)
    
    carritohtml();
}

//Muestra el Carrito en compras en el HTML
function carritohtml(){
    
    //Limpiar HTML
    limpiarHTML();
    
    
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src ="${imagen}" width = 100px> </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
        `;
        
        // Agrega el HTML del carrito en el body
        contenedorCarrito.appendChild(row);
    });
    
}

// Elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML = '';
    
    //forma rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}