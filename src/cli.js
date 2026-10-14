import fs from 'fs';
import path from 'path';
import gestionarError from './errores/gestionErrores.js';
import contarPalabras from './index.js';
import {generaResultadoUsuario} from './helpers.js';
import {program} from 'commander';
import chalk from 'chalk';

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'Ruta del archivo a procesar')
    .option('-r, --resultados <string>', 'Ruta de la carpeta donde se guardara el resultado')
    .action((options) => {
        const {texto, resultados} = options;

        if (!texto || !resultados) {
            console.error (chalk.bgRed('Error: Debe proporcionar la ruta del archivo de texto y la ruta de la carpeta de resultados.'));
            program.help(); 
            return;
        }

        const rutaArchivoTexto = path.resolve(texto);
        const rutaCarpetaResultado = path.resolve(resultados);
        try {
            ProcesaArchivo(rutaArchivoTexto, rutaCarpetaResultado);
        } catch (error) {
            console.log (chalk.bgRed(error));
        }
    });    

program.parse(process.argv);    


function ProcesaArchivo(nombreArchivoTexto, carpetaResultados) {
        fs.readFile(nombreArchivoTexto, 'utf-8', (error, texto) => {
            try {
                if (error)
                    throw error;
                const listaPalabras = contarPalabras(texto);
                crearYguardarResultado(listaPalabras, carpetaResultados);
            } catch (error) {
                console.log (chalk.bgRed(gestionarError(error)));
            }
        });
    }        

async function crearYguardarResultado(resultado, rutaArchivo) {
    const nombreArchivoResultado = `${rutaArchivo}/resultados.txt`;
    const resultadoEnTexto = generaResultadoUsuario(resultado);

    try{
        console.log (chalk.blue("Creando archivo de resultado"), nombreArchivoResultado );
        await fs.promises.writeFile(nombreArchivoResultado, resultadoEnTexto);
        console.log (chalk.green("Archivo de resultado creado con exito"));
    }
    catch(error){
        throw error;
    }
}    
// function crearYguardarResultado(resultado, rutaArchivo) {
//     const nombreArchivoResultado = `${rutaArchivo}/resultados.txt`;
//     const resultadoEnTexto = JSON.stringify(resultado);

//     fs.promises.writeFile(nombreArchivoResultado, resultadoEnTexto)
//         .then(() => {
//             console.log("Archivo de resultado creado con exito");
//         })
//         .catch((error) => {
//             throw error;
//         })
//         .finally(() => {
//             console.log("Finalizada la operacion");
//         });
// }        