export default function gestionarError(error) {
    if (error.code === 'ENOENT') {
        return `No se encontro el archivo solicitado: ${error.path}`;
    }    else {
            return error.message ?? 'Error desconocido';
        }
}

