import { NextFunction, Request, Response } from "express";
import Token from '../classes/token';

export const verficaToken = (req:any,res:Response,next:NextFunction)=>{
    const token = req.get('x-token') || '';

    Token.comprobarToken(token)
         .then((decoded:any)=>{
            req.usuario = decoded.usuario
            req.mensaje = 'middleware a controlador'
            next()
         })
         .catch((err)=>{
             res.status(403).json({
                 mensaje:'Token invalido'
             })
         })
         

}