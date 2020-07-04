import { Router, Request, Response } from "express";
import { Usuario, IUsuario } from '../models/usuario.model';
import bcrypt from "bcrypt";
import Token from '../classes/token';
import { verficaToken } from '../middlewares/autenticacion';

const userRoutes = Router();


userRoutes.post('/login',(req:Request,res:Response)=>{
    const body = req.body;
    Usuario.findOne({email:body.email},(err,userDB)=>{
        if(err) throw err;
        
        if(!userDB){
            return res.status(403).json({
                message:'Usuario/password incorrecto'
            })
        }

        if(userDB.compararPassword(body.password)){
           const tokenUser = Token.getJwtToken({
                _id:userDB._id,
                nombre:userDB.nombre,
                email:userDB.email,
                avatar:userDB.avatar
           })
           return res.json({
                ok:true,
                token:tokenUser
            })
        }else{
            return res.json({
                ok:false,
                token:''
            })
        }
    })
})

userRoutes.post('/create',(req:Request, res:Response)=>{

    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,10), 
        avatar: req.body.avatar
    };

    Usuario.create(user as IUsuario).then(userDB =>{

        const tokenUser = Token.getJwtToken({
            _id:userDB._id,
            nombre:userDB.nombre,
            email:userDB.email,
            avatar:userDB.avatar
       })

       return res.json({
            ok:false,
            toke:tokenUser
        })

    }).catch((err)=>{
        return res.json({
            err
        });

    });
});


userRoutes.post('/update',verficaToken,(req:any, res:Response)=>{
    
    const user ={
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    }


    Usuario.findByIdAndUpdate(req.body._id,user,(err,userDB)=>{
        if(err) throw err;

        if(!userDB){
            return res.status(204).json({
                mensaje:'No exite el usuario'
            })
        }

        const tokenUser = Token.getJwtToken({
            _id:userDB._id,
            nombre:userDB.nombre,
            email:userDB.email,
            avatar:userDB.avatar
        })

       return res.json({
            ok:false,
            toke:tokenUser
        })
    })
    
})

export default userRoutes;