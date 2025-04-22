// Función que actualiza el contenido del reloj en la página
function actualizarReloj() {
    // Crea un nuevo objeto de fecha con la hora actual
    const ahora = new Date();
    // Convierte la hora actual a un formato legible (hora:minuto:segundo) usando el formato local de Chile
    const formato = ahora.toLocaleTimeString("es-CL");
    // Busca el elemento del DOM con el ID "reloj" y actualiza su contenido de texto con la hora formateada
    document.getElementById("reloj").textContent = formato;
}
    // Llama a la función actualizarReloj cada 1000 milisegundos (1 segundo) para que el reloj se actualice en tiempo real
    setInterval(actualizarReloj, 1000);
    // Llama a la función una vez inmediatamente, para que no se espere 1 segundo antes de mostrar la hora al cargar la página
    actualizarReloj();

 // Inicializar contadores de artículos
function inicializarContadores() {
    const secciones = ['inicio', 'deportes', 'negocios'];
    
    secciones.forEach(seccion => {
        const articulos = document.querySelectorAll(`#${seccion} .articulo`);
        const contador = document.getElementById(`contador-${seccion}`);
        if (contador) {
            contador.textContent = articulos.length;
        }
    });    
    // Actualizar contador total
    actualizarContadorTotal();
}
// Actualizar contador total de artículos
function actualizarContadorTotal() {
    const totalArticulos = document.querySelectorAll('.articulo').length;
    const contadorTotal = document.getElementById('contador-total');
    if (contadorTotal) {
        contadorTotal.textContent = totalArticulos;
    }
}
// Función para añadir un nuevo artículo
function agregarArticulo(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const seccion = document.getElementById('seccion-articulo').value;
    const titulo = document.getElementById('titulo-articulo').value;
    const contenido = document.getElementById('contenido-articulo').value;
    
    // Validación simple
    if (!titulo || !contenido) {
        alert('Por favor complete el título y contenido del artículo');
        return;
    }
   
   // Validación simple
   if (!seccion || !titulo || !contenido) {
    alert('Por favor complete todos los campos del formulario');
    return;
}

// Crear nuevo artículo con la misma estructura que los existentes
const nuevoArticulo = document.createElement("div");
nuevoArticulo.className = "column is-4";
nuevoArticulo.innerHTML = `
    <div class="card articulo">
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <h3 class="title is-5">${titulo}</h3>
                    <span class="tag is-primary">Nueva Noticia</span>
                    <p>${contenido}</p>
                    <button type="button" class="button is-danger btn-eliminar">Eliminar</button>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item">Leer más</a>
                    </footer>                    
                </div>
            </div>
        </div>
    </div>
`;

// Agregar el nuevo artículo a la sección correspondiente
const seccionDestino = document.getElementById(`contenedor-${seccion}`)
if (seccionDestino) {
    seccionDestino.appendChild(nuevoArticulo);
} else {
    console.error(`No se encontró el contenedor: contenedor-${seccion}`);
}
   
   // Actualizar contador de artículos
   const contador = document.getElementById(`contador-${seccion}`);
   if (contador) {
       contador.textContent = parseInt(contador.textContent) + 1;
   }    
   // Actualizar contador total
   actualizarContadorTotal(); 
   
   // Limpiar formulario
   document.getElementById('formulario-articulo').reset();
}
// Función para actualizar el contador total de artículos
function actualizarContadorTotal() {
   const contadores = document.querySelectorAll('[id^="contador-"]:not(#contador-total)');
   let total = 0;
   contadores.forEach(c => {
       total += parseInt(c.textContent);
   });

   const totalContador = document.getElementById('contador-total');
   if (totalContador) {
       totalContador.textContent = total;
   }
}

// Función para inicializar los contadores
function inicializarContadores() {
   const contadores = document.querySelectorAll('[id^="contador-"]:not(#contador-total)');
   contadores.forEach(contador => {
       contador.textContent = '3';
   });
   actualizarContadorTotal();
}

   // Función para manejar eliminación de artículos
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-eliminar')) {
        // Encuentra el elemento column is-4 que contiene el artículo
        const columnaArticulo = event.target.closest('.column');
        if (!columnaArticulo) return;        
        // Obtener el contenedor padre que tiene el ID (contenedor-inicio, contenedor-deportes, etc.)
        const contenedor = columnaArticulo.parentElement;
        if (!contenedor) return;        
        // Obtener el ID de la sección a partir del ID del contenedor
        const idContenedor = contenedor.id;
        const seccionId = idContenedor.replace('contenedor-', '');        
        // Eliminar artículo
        columnaArticulo.remove();        
        // Actualizar contador de sección
        const contador = document.getElementById(`contador-${seccionId}`);
        if (contador) {
            contador.textContent = Math.max(parseInt(contador.textContent) - 1, 0);
        }        
        // Actualizar contador total
        actualizarContadorTotal();
    }
});

// Inicializar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
   // Configurar reloj
   actualizarReloj();
   setInterval(actualizarReloj, 1000);
   
   // Inicializar contadores
   inicializarContadores();
   
   // Configurar listeners para formularios
   const formArticulo = document.getElementById('formulario-articulo');
   if (formArticulo) {
       formArticulo.addEventListener('submit', agregarArticulo);
   }
   
   const formContacto = document.getElementById('formulario-contacto');
   if (formContacto) {
       formContacto.addEventListener('submit', enviarContacto);
   } 
});

//activa el menú burger para móviles:
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.navbar-burger');
    const menu = document.querySelector('#mainMenu');
  
    if (burger && menu) {
      burger.addEventListener('click', () => {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
      });
    }
  });

//Carrusel  
// Inicialización de variables
let currentIndex = 0;                                  // Almacena el índice del slide actual
const items = document.querySelectorAll('.carousel-item'); // Selecciona todos los elementos del carrusel
const dots = document.querySelectorAll('.dot');            // Selecciona todos los puntos de navegación
const totalItems = items.length;                          // Guarda el número total de elementos del carrusel

// Función para mostrar un slide específico según su índice
function showSlide(index) {
  // Recorre todos los elementos del carrusel
  items.forEach((item, i) => {
    // Añade la clase 'is-active' solo al elemento que coincide con el índice actual
    // y la elimina de los demás elementos
    item.classList.toggle('is-active', i === index);
  });
  
  // Recorre todos los puntos de navegación
  dots.forEach((dot, i) => {
    // Añade la clase 'is-active' solo al punto que coincide con el índice actual
    // y la elimina de los demás puntos
    dot.classList.toggle('is-active', i === index);
  });
}

// Función para avanzar al siguiente slide
function nextSlide() {
  // Incrementa el índice y usa el operador módulo (%) para volver al principio
  // cuando llegue al final de los slides
  currentIndex = (currentIndex + 1) % totalItems;
  showSlide(currentIndex);  // Muestra el slide actualizado
}

// Función para retroceder al slide anterior
function prevSlide() {
  // Decrementa el índice y usa una fórmula para asegurar que sea positivo
  // cuando retroceda desde el primer slide (vuelve al último)
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  showSlide(currentIndex);  // Muestra el slide actualizado
}

// Configura el evento click para el botón "siguiente"
document.querySelector('.carousel-next').addEventListener('click', nextSlide);

// Configura el evento click para el botón "anterior"
document.querySelector('.carousel-prev').addEventListener('click', prevSlide);

// Configura eventos para los puntos de navegación
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    // Obtiene el índice almacenado en el atributo data-index del punto
    currentIndex = parseInt(dot.dataset.index);
    showSlide(currentIndex);  // Muestra el slide correspondiente al punto
  });
});
// Configura el avance automático del carrusel cada 3 segundos (5000ms)
setInterval(nextSlide, 3000);
 // Función que se ejecuta al enviar un mensaje desde un formulario
 function enviarMensaje() {
    // Obtiene y limpia el valor del campo de texto con ID "nombre"
    const nombre = document.getElementById('nombre').value.trim();
    // Obtiene y limpia el valor del campo de texto con ID "mensaje"
    const mensaje = document.getElementById('mensaje').value.trim();
    // Verifica que ambos campos no estén vacíos
    if (nombre && mensaje) {
      // Muestra un mensaje de agradecimiento personalizado
      alert('Gracias por tu mensaje, ' + nombre + '. Pronto te responderemos.');
      // Reinicia el formulario
      document.getElementById('formContacto').reset();
    } else {
      // Si falta algún campo, muestra un mensaje de advertencia
      alert('Por favor completa todos los campos.');
    }
  }

  // Script para el anuncio superior
  document.addEventListener('DOMContentLoaded', () => {
    // Funcionamiento del botón de cierre del anuncio
    const closeButton = document.querySelector('.notification .delete');
    closeButton.addEventListener('click', () => {
      const notification = closeButton.parentNode;
      notification.parentNode.removeChild(notification);
    });
    
    // Funcionamiento del menú hamburguesa en móviles
    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if (navbarBurgers.length > 0) {
      navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          const target = document.getElementById(el.dataset.target);
          el.classList.toggle('is-active');
          target.classList.toggle('is-active');
        });
      });
    }
  });
    