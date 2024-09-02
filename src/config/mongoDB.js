const { connect } = require('mongoose')

const connectDB = async () => {
    console.log('Conectado a BD Mongo Atlas');
    await connect('mongodb+srv://DAVS_CoderHouse_Backend:davs1509@cluster0.wtz9xqt.mongodb.net/ElCodigoLoco?retryWrites=true&w=majority&appName=Cluster0')
}


module.exports = {
    connectDB
}