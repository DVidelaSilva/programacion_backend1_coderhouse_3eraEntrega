const { cartsModel } = require('../../models/carts.model')


class CartManagerMongo {

    constructor(){
        this.model = cartsModel
    }

    // GET (READ) a MongoDB
    getCarts= async () => this.model.find({})

    // GET by opts (READ) a MongoDB
    getCart = async opts => this.model.findOne({_id: opts})

    // POST (CREATE) a MongoDB
    createCart = async newCart => this.model.create(newCart)

// POST Añadir productos a carrito
createProductToCart = async (idCart, idProduct, body) => {
    try{
    
    //Obtener Carritos por ID
    const carts = await this.model.findOne({_id: idCart})
    const cartById = carts.find(cart => cart.id === Number(idCart))

    // Valida que ID sea un numero y mayor a cero
    if (isNaN(idCart) || Number(idCart) <= 0) {
        throw new Error (`El ID '${idCart}' ingresado no es un ID válido`)
    } 
    //Valida si existen Carrito en FS
    if (carts.length === 0) {
        throw new Error ('No existen Carritos en File System')
    }
    // Valida si encuentra el Carrito por el ID
    if(!cartById){
        throw new Error (`Carrito ID '${idCart}' NO encontrado en File System`)
    } 

    //Obtener Productos por ID
    const products = await this.model.findOne({_id: idProduct})
    const productById = products.find(product => product.id === Number(idProduct))
    
    // Valida que ID sea un numero y mayor a cero
    if (isNaN(idProduct) || Number(idProduct) <= 0) {
        throw new Error (`El ID '${idProduct}' ingresado no es un ID válido`)
    } 
    //Valida si existen productos en FS
    if (products.length === 0) {
        throw new Error ('No existen Productos en File System')
    }
    // Valida si encuentra el producto por el ID
    if(!productById){
        throw new Error (`Productos ID '${idProduct}' NO encontrado en File System`)
    } 


    const quantityBody = body.quantity

    // Verificar si el producto ya está en el carrito
    const existingProduct = cartById.Products.find(item => item.id === productById.id)

    if (existingProduct) {
        // Si ya existe, sumar la cantidad
        existingProduct.quantity += quantityBody
    } else {
        // Si no existe, agregar el nuevo objeto
        cartById.Products.push({ id: productById.id, quantity: quantityBody })
    }

    this.model.create(carts)

  

    } catch (error){
        console.log(error)
        throw error
    }
};

    // PUT (UPDATE) a MongoDB
    updateCart = async (opts, field) => this.model.updateOne({_id: opts}, field)
    
    // DELETE (DELETE) a MongoDB
    deleteCart = async opts => this.model.deleteOne({_id: opts})

}



module.exports = {
    CartManagerMongo
}