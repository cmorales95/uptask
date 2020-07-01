import Swal from "sweetalert2";
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;
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
            if (result) {
                //* Enviamos petición a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;

                axios.delete(url, { params: { urlProyecto } })
                    .then(res => {
                        Swal.fire(
                                'Proyecto Eliminado',
                                res.data,
                                'success'
                            )
                            //* redireccionamos
                        setTimeout(() => {
                            window.location.href = "/"
                        }, 3000);
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el Proyecto'
                        });
                    });
                return;
            }
        })
    });
}
export default btnEliminar;