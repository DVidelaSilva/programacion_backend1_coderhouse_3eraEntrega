const express = require('express')
const appRouter = require('./router/routers')
const { connectDB } = require('./config/mongoDB')

// Configuraciones Express
const app = express()
const PORT = 8080 

// Configuraciones Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Configuraciones MongoDB
connectDB()


// Configuraciones Rutas
app.use(appRouter)


// Escucha Servidor
app.listen(PORT, error => {
        if(error){
            console.log(error)
        } else {
            console.log(`Servidor Escuchando en puerto -> [${PORT}]`);
        }
})