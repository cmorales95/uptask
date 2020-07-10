import Swal from "sweetalert2";

export const actualizarAvance = () => {
  const tareas = document.querySelectorAll("li.tarea");
  //* validamos si hay tareas
  if (tareas.length) {
    //* Seleccionar tareas completadas
    const tareasCompletadas = document.querySelectorAll("i.completo");
    //* Calculamos el avance
    const avance = Math.round((tareasCompletadas.length / tareas.length) * 100);
    //* Mostart porcentaje
    const porcentaje = document.querySelector("#porcentaje");
    porcentaje.style.width = avance + "%";

    if (avance === 100) {
      Swal.fire(
        "Completaste el proyecto",
        "Felicidades por completar el proyecto :)",
        "success"
      );
    }
  }
};
