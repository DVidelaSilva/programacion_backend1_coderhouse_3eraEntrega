const { Router } = require('express')
const productsRouter = require('./api/products.router')
const cartsRouter = require('./api/carts.router')

const router = Router()

//router.use('/', () => {})
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)


module.exports = router
