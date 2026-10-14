export default function contarPalabras(texto) {
    const parrafos = extraerParrafos(texto);
    const listaPalabrasParrafos = parrafos.flatMap((parrafo) => {
        if (!parrafo)
            return [];
        return verificaCantidadPalabras(parrafo);
    })    
    
    return listaPalabrasParrafos;
}

function extraerParrafos(texto) {
    if (!texto) {
        throw "El texto no puede estar vacio";

    }
    return texto.toLowerCase().split('\n');
   
}


function limpiarPalabra(palabra) {
  return palabra.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '');
}




function verificaCantidadPalabras(texto) {
    const listaPalabras = texto.split(' ');

    const resultado = {};

    listaPalabras.forEach(palabra => {
        const palabraLimpia = limpiarPalabra(palabra);
        if (palabraLimpia.length >= 3){
            resultado[palabraLimpia] = (resultado[palabraLimpia] || 0) + 1;
        }
        
    });
    return resultado;
}

