import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem{
    
    constructor(){}

    guardarImgenTemporal(file: FileUpload, userId: string){

        return new Promise((resolve,reject)=>{
            const path = this.crearCarpetaUsuario(userId);
            const nombreArchivo = this.generarNombreUnico(file.name);
            //console.log('Este es el fichero',file)
            file.mv(`${path}/${nombreArchivo}`,(err:any)=>{
                if(err){
                    reject(err)
                }else{
                    resolve()    
                }
            })
        })
    }

    private generarNombreUnico(nombreOriginal: string){
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];

        const idUnico = uniqid();

        return `${idUnico}.${extension}`;
    }

    private crearCarpetaUsuario(userId: string){
        
        const pathUser = path.resolve(__dirname, '../uploads',userId)

        //console.log('Construyendo el path User ', pathUser)
        
        const pathUserTemp = pathUser + '/temp';
        
        //console.log('Construyendo el path user temp',pathUserTemp);

        const existe = fs.existsSync(pathUser);

        //console.log('Construyendo la variable exsite',existe);

        if( !existe ){
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }


    imagenesDeTempHaciaPost(userId:string){
        
        const pathTemp = path.resolve(__dirname, '../uploads', userId,'temp');
        
        const pathPost = path.resolve(__dirname, '../uploads', userId,'posts');
        
        console.log(pathTemp);
        console.log(pathPost);

        if(!fs.existsSync( pathTemp )){
            return [];
        }

        if(!fs.existsSync( pathPost )){
            fs.mkdirSync( pathPost );
        }

        const imagenesTemp = this.obtenerImagenesTemp(userId);

        imagenesTemp.forEach(imagen =>{
            fs.renameSync(`${pathTemp}/${imagen}`,`${pathPost}/${imagen}`)
        })

        console.log('imagenes encontradas',imagenesTemp)

        return imagenesTemp;

    }
    private obtenerImagenesTemp(userId: string) {
        const pathTemp = path.resolve(__dirname,'../uploads/',userId,'temp');

        return fs.readdirSync( pathTemp ) || [];
    }

    getFotoUrl( userId:string, img:string ){    
        const pathPost = path.resolve(__dirname, '../uploads', userId,'posts', img);

        if(!fs.existsSync( pathPost )){
            return path.resolve(__dirname, '../uploads/default.png');
        }

        return pathPost;
    }
}