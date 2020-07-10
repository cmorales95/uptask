import axios from "axios";
import Swal from "sweetalert2";
import {actualizarAvance} from "../funciones/avance";

const tareas = document.querySelector('.listado-pendientes'); // un div

if (tareas) {
    
    tareas.addEventListener('click', e => {
        //* Cambiar estado
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target; 
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            
            //request /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;
            
            axios.patch(url, {
                idTarea
            }).then(resp => { //* Se completó la actualización
                icono.classList.toggle('completo');
                actualizarAvance();
            });
        }
        //! Eliminar
        if (e.target.classList.contains('fa-trash')) {
             const tareaHtml = e.target.parentElement.parentElement; // el li que lo contiene
             const idTarea = tareaHtml.dataset.tarea;
             console.log(idTarea);

             // Preguntamos
             Swal.fire({
                title: '¿Deseas borrar esta tarea?',
                text: "una tarea eliminada no se puede recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrar',
                cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.value) {
                    const url = `${location.origin}/tareas/${idTarea}`;

                    //! enviamos a eliminar por medio de axios
                    axios.delete(url, { params: idTarea})
                        .then((resp) => {
                            if (resp.status === 200) { // 200 en Ok
                                //! eliminamos el elemento
                                // vamos hasto el ul para eliminar el respectivo li
                                tareaHtml.parentElement.removeChild(tareaHtml)

                                // TODO: Agregar una alerta
                                Swal.fire(
                                    'Tarea Eliminada',
                                    resp.data,
                                    'success'
                                );
                                actualizarAvance();
                            }
                        });
                };
            }); 
        }
    });
}

export default tareas;