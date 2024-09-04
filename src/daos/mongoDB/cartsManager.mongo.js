const { cartsModel } = require('../../models/carts.model')
const { productModel } = require('../../models/products.model')


class CartManagerMongo {

    constructor(){
        this.model = cartsModel
    }

    // READ a MongoDB
    getCarts= async () => this.model.find({})

    // READ por _id a MongoDB
    getCart = async opts => this.model.findOne({_id: opts})

    // POST (CREATE) a MongoDB
    //createCart = async (newCart) => this.model.create(newCart)

    // POST (CREATE) a MongoDB
    createCart = async (newCart) => {
    try {
        // Asegúrate de pasar un objeto que cumpla con el esquema definido
        return await this.model.create(newCart);
    } catch (error) {
        throw new Error(`Error al crear el carrito: ${error.message}`);
    }
};







    // POST Añadir productos a carrito
    createProductToCart = async (idCart, idProduct, body) => {
        try {
/*             // Valida que ID sea un número y mayor a cero
            if (isNaN(idCart) || Number(idCart) <= 0) {
                throw new Error(`El ID '${idCart}' ingresado no es un ID válido`);
            }
            if (isNaN(idProduct) || Number(idProduct) <= 0) {
                throw new Error(`El ID '${idProduct}' ingresado no es un ID válido`);
            } */

            // Obtener Carrito por ID
            const cart = await this.model.findById({_id: idCart});
            if (!cart) {
                throw new Error(`Carrito ID '${idCart}' NO encontrado en File System`);
            }

            // Obtener Producto por ID
            const product = await productModel.findById({_id: idProduct});
            if (!product) {
                throw new Error(`Producto ID '${idProduct}' NO encontrado en File System`);
            }

            const quantityBody = body.quantity;

            // Verificar si el producto ya está en el carrito
            const existingProduct = cart.products.find(item => item.id.toString() === idProduct);

            if (existingProduct) {
                // Si ya existe, sumar la cantidad
                existingProduct.quantity += quantityBody;
            } else {
                // Si no existe, agregar el nuevo objeto
                cart.products.push({ _id: idProduct, quantity: quantityBody });
            }

            // Guardar los cambios en el carrito
            await cart.save();

            return cart; // Devuelve el carrito actualizado

        } catch (error) {
            console.log(error);
            throw error;
        }
    };





updateCart = async (idCart, idProduct, quantity) => {
    try {
        /*             // Valida que ID sea un número y mayor a cero
                    if (isNaN(idCart) || Number(idCart) <= 0) {
                        throw new Error(`El ID '${idCart}' ingresado no es un ID válido`);
                    }
                    if (isNaN(idProduct) || Number(idProduct) <= 0) {
                        throw new Error(`El ID '${idProduct}' ingresado no es un ID válido`);
                    } */
        
                    // Obtener Carrito por ID
                    const cart = await this.model.findById({_id: idCart});
                    if (!cart) {
                        throw new Error(`Carrito ID '${idCart}' NO encontrado en File System`);
                    }
        
                    // Obtener Producto por ID
                    const product = await productModel.findById({_id: idProduct});
                    if (!product) {
                        throw new Error(`Producto ID '${idProduct}' NO encontrado en File System`);
                    }
        
                    //onst quantityBody = body.quantity;
        
                    // Verificar si el producto ya está en el carrito
                    const existingProduct = cart.products.find(item => item.id.toString() === idProduct);
        
                    if (existingProduct) {
                        // Si ya existe, actualizar la cantidad
                        existingProduct.quantity = quantity;
                    } else {
                        // Si no existe, agregar el producto con su cantidad
                        cart.products.push({ id: idProduct, quantity: quantity });
                    }
        
                    // Guardar los cambios en el carrito
                    await cart.save();
        
                    return cart; // Devuelve el carrito actualizado
        
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            };
        

    // PUT (UPDATE) a MongoDB
    //updateCart = async (opts, field) => this.model.updateOne({_id: opts}, field)
    
    // Método para eliminar productos en el carrito sin eliminar el carrito
    deleteCart = async idCart => {
        try {
            // Verificar si el carrito existe
            const cart = await this.model.findById({_id: idCart});
            if (!cart) {
                throw new Error(`Carrito ID '${idCart}' NO encontrado`);
            }

            // Vaciar la lista de productos
            cart.products = [];
            
            // Guardar los cambios en el carrito
            await cart.save();

            return cart; // Devuelve el carrito actualizado (vacío)
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}




module.exports = {
    CartManagerMongo
}