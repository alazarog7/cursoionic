import Server from "./classes/server";
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import postRoutes from './routes/post';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const server = new Server();


//Middleware
server.app.use(bodyParser.urlencoded({extended:true}));

server.app.use(bodyParser.json());

server.app.use( fileUpload({useTempFiles: true}) );

server.app.use(cors({origin:'http://localhost:8100',credentials:true}))


// server.app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     //res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-token');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, HEAD, PUT, PATCH, POST, DELETE');
//     next();
// });
  

server.app.use('/user',userRoutes);
server.app.use('/posts',postRoutes);

mongoose.connect('mongodb+srv://alejandro:ale@cluster0-ffbln.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useCreateIndex:true},(err)=>{
    if(err) throw err;
    console.log('Bases de datos Online')
})



server.start(()=>{
    console.log(`Servidor corriendo en ${server.port}`)
});