function filtrarPalabrasRepetidas(parrafo) {
    return Object.keys(parrafo).filter((palabra) => parrafo[palabra] > 1);
}

export function generaResultadoUsuario(listaPalabras) {
    let textoResultado = '';
    listaPalabras.forEach((parrafo, index) => {
        const palabrasDuplicadas = filtrarPalabrasRepetidas(parrafo).join(', ');
        if (palabrasDuplicadas.length > 0) {
            textoResultado += `Palabras duplicadas en el Parrafo ${index + 1}: ${palabrasDuplicadas}\n`;
        }
    });
    return textoResultado;
}
