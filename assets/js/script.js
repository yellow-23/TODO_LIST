let tareas = [
    { id: 1, descripcion: "Hacer la compra", completado: false },
    { id: 2, descripcion: "Estudiar JavaScript", completado: false },
    { id: 3, descripcion: "Hacer ejercicio", completado: true }
];

// Renderizar tareas al cargar la página
document.addEventListener("DOMContentLoaded", actualizarLista);

function agregarTarea() {
    const input = document.getElementById("taskInput");
    const descripcion = input.value.trim();
    
    if (descripcion === "") return alert("Escribe una tarea válida");

    const nuevaTarea = {
        id: Date.now(),
        descripcion,
        completado: false
    };

    tareas.push(nuevaTarea);
    input.value = "";
    actualizarLista();
}

function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    actualizarLista();
}

function marcarCompletado(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) tarea.completado = !tarea.completado;
    actualizarLista();
}

function actualizarLista() {
    const lista = document.getElementById("taskList");
    lista.innerHTML = "";

    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.className = tarea.completado ? "completed" : "";
        li.innerHTML = `
            <span>${tarea.descripcion}</span>
            <div>
                <button onclick="marcarCompletado(${tarea.id})">✓</button>
                <button onclick="eliminarTarea(${tarea.id})">🗑️</button>
            </div>
        `;
        lista.appendChild(li);
    });

    // Actualizar resumen
    document.getElementById("totalTareas").innerText = tareas.length;
    document.getElementById("tareasCompletadas").innerText = tareas.filter(t => t.completado).length;
}
