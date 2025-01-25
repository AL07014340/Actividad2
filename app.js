class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.completa = false;
    }

    completar() {
        this.completa = !this.completa;
    }
}

class GestorDeTareas {
    constructor() {
        this.tareas = [];
    }

    agregarTarea(nombre) {
        const tarea = new Tarea(nombre);
        this.tareas.push(tarea);
        this.render();
    }

    editarTarea(indice, nuevoNombre) {
        this.tareas[indice].nombre = nuevoNombre;
        this.render();
    }

    eliminarTarea(indice) {
        const tareaEliminada = this.tareas[indice];
        if (tareaEliminada.nombre.toLowerCase() === "goku") {
            eliminarImagenGoku(); //esto va a eliminar la imagen de goku.
        }
        this.tareas.splice(indice, 1);
        this.render();
    }
    

    render() {
        const lista = document.getElementById("lista-tarea");
        lista.innerHTML = "";

        this.tareas.forEach((tarea, indice) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <span>${tarea.nombre}</span>
                <div>
                    <button class="btn btn-primary btn-sm editar-btn">Editar</button>
                    <button class="btn btn-danger btn-sm eliminar-btn">Eliminar</button>
                </div>
            `;

            li.querySelector(".editar-btn").addEventListener("click", () => {
                const nuevoNombre = prompt("Edita la tarea:", tarea.nombre);
                if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
                    this.editarTarea(indice, nuevoNombre.trim());
                }
            });

            li.querySelector(".eliminar-btn").addEventListener("click", () => {
                if (confirm("¿Estás seguro de eliminar esta tarea?")) {
                    this.eliminarTarea(indice);
                }
            });

            lista.appendChild(li);
        });
    }
}

const gestorDeTareas = new GestorDeTareas();

document.getElementById("boton-agregar").addEventListener("click", () => {
    const nuevaTareaInput = document.getElementById("nueva-tarea");
    const tareaTexto = nuevaTareaInput.value.trim();

    if (tareaTexto === "") {
        alert("Escribe una tarea, encuentra a goku");
        return;
    }

    // Verificar si la palabra es "goku"
    if (tareaTexto.toLowerCase() === "goku") {
        mostrarImagenGoku();
    }

    gestorDeTareas.agregarTarea(tareaTexto);
    nuevaTareaInput.value = "";
});

function mostrarImagenGoku() {
    const contenedorImagen = document.getElementById("imagen-goku");
    contenedorImagen.innerHTML = `
        <img src="./img/goku.png" alt="Goku" class="img-fluid rounded" width="200">
    `;
}

function eliminarImagenGoku() {
    const contenedorImagen = document.getElementById("imagen-goku");
    contenedorImagen.innerHTML = ""; 
}
