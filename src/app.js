import express from 'express';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js';
import {Server} from 'socket.io'
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';


//instancia  exp
const app = express ()
// instancia serv
const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`Server run on ${PORT}`);
})

const httpServer = app.listen(PORT, () => {
    console.log("Servidor escuchando por el puerto: " + PORT);
});

// const socketServer = new Server
const socketServer = new Server(httpServer);

// conf servidor para recibir obj json.
app.use (express.json());
app.use(express.urlencoded({extended:true}));
//carpeta public
app.use(express.static (__dirname + '/public'))



//rutas - serv pa recibir obj Json
app.use ('/api/products', productsRouter);
app.use ('api/carts/', cartsRouter);

// conf Motor de pl HBS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');

//Utilizamos este Middleware genérico para enviar la instancia del servidor de Socket.io a las routes
app.use((req,res,next)=>{
    req.io = socketServer
    next()
})



// Declaramos el router




// Abrimos el canal de comunicacion
socketServer.on('connection', socket=>{
console.log(socket.id);

// escuchamos al cliente
socket.on('msg_front', message=>{
   console.log(message);
})

socket.emit('msg_back', 'Mesaje enviado desde el back!!')

socket.broadcast.emit("evento_para_todos_excepto_socket_actual", "Este evento es para todos los sockets, menos el socket desde que se emitió el mensaje!");
    
socketServer.emit("evento_para_todos", "Evento para todos los Sockets!")
})
