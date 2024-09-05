const { cartsModel } = require('../../models/carts.model')
const { productModel } = require('../../models/products.model')


class CartManagerMongo {

    constructor(){
        this.model = cartsModel
    }


//?? ***************** READ a MongoDB *****************
    getCarts= async () => this.model.find({})

    
//?? ***************** READ por _id MongoDB *****************
    getCart = async opts => this.model.findOne({_id: opts})


//?? ***************** CREATE a MongoDB *****************
    createCart = async (newCart) => await this.model.create(newCart)


//?? ***************** CREATE producto en carrito a MongoDB *****************
    createProductToCart = async (idCart, idProduct, body) => {

            const cart = await this.model.findById({_id: idCart})
            const product = await productModel.findById({_id: idProduct})
            const quantityBody = body.quantity
            // Verificar si el producto ya está en el carrito
            const existingProduct = cart.products.find(item => item.id.toString() === idProduct)
            if (existingProduct) {
                // Si ya existe, sumar la cantidad
                existingProduct.quantity += quantityBody
            } else {
                // Si no existe, agregar el nuevo objeto
                cart.products.push({ _id: idProduct, quantity: quantityBody })
            }
            // Guardar los cambios en el carrito
            await cart.save();
            return cart; // Devolver el carrito actualizado
    };


//?? ***************** UPDATE quantity en carrito a MongoDB *****************
    updateCart = async (idCart, idProduct, quantity) => {

            const cart = await this.model.findById({_id: idCart});
            const product = await productModel.findById({_id: idProduct});
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
            return cart; // Devolver el carrito actualizado
    };
        


//?? ***************** DELETE productos de carrito a MongoDB *****************

    deleteCart = async idCart => {

            const cart = await this.model.findById({_id: idCart});
            // Vaciar la lista de productos
            cart.products = [];         
            // Guardar los cambios en el carrito
            await cart.save();
            return cart; // Devolver el carrito actualizado (vacío)
    };
};




module.exports = {
    CartManagerMongo
}