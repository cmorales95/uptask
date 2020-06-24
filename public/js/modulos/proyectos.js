import Swal from "sweetalert2";
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', () => {
        Swal.fire({
            title: '¿Deseas borrar este proyecto?',
            text: "Recuerda que una vez eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Proyecto Eliminado',
                    'El proyecto se ha eliminado.',
                    'success'
                )
                setTimeout(() => {
                    window.location.href = "/"
                }, 3000);

            }
        })
    });
}