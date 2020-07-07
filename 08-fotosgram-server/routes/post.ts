import { Router, Response } from 'express';
import { verficaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';
import { Usuario } from '../models/usuario.model';

const postRoutes = Router();
const fileSystem = new FileSystem();

postRoutes.get('/',async (req:any,res:Response)=>{
    
    const pagina = +req.query.pagina || 1;
    let skip = pagina - 1
    skip = skip * 10
    const posts = await Post.find().sort({_id:-1}).skip(skip).limit(10).populate('usuario','-password').exec();
    
    res.json({
        ok:true,
        pagina,
        posts
    });
});


postRoutes.post('/',[verficaToken],(req:any,res:Response)=>{

    const body = req.body;
    body.usuario = req.usuario._id;

    const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id)
    body.img = imagenes;

    Post.create(body).then( async postDB=>{
        await postDB.populate('usuario','-password').execPopulate();
        res.json({
            ok:true,
            post:postDB
        });
    }).catch(err=>{
        res.status(505).json(err);
    })

})


postRoutes.post('/upload',[verficaToken],async (req:any,res:Response)=>{
    if(!req.files ){
        return res.status(400).json({
            ok:false,
            mensaje:'No se subio ningun archivo'
        })
    }

    const file: FileUpload= req.files.image;

    if(!file){
        return res.status(400).json({
            ok:false,
            mensaje:'No se subio ningun archivo'
        })
    }

    if(!file.mimetype.includes('image')){
        return res.status(500).json({
            ok:false,
            mensaje:'No se subio ningun archivo'
        })
    }

    await fileSystem.guardarImgenTemporal(file,req.usuario._id);

    return res.status(201).json({
        ok:true,
        file
    })
})


postRoutes.get('/imagen/:userid/:img',(req:any, res:Response)=>{
    const userId = req.params.userid;
    const img = req.params.img;

    const pathFoto = fileSystem.getFotoUrl( userId, img);


    return res.sendFile(pathFoto);
});

export default postRoutes;