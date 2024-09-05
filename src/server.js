const express = require('express')
const appRouter = require('./router/routers')
const { connectDB } = require('./config/mongoDB')
const handlebars = require('express-handlebars')

// Configuraciones Express
const app = express()
const PORT = 8080 

// Configuraciones Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Configuraciones MongoDB
connectDB()

// Configuracion Handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

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