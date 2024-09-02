const { Router } = require('express')

const router = Router()

//GET
router.get('/', async (req, res) => {
    res.send({status: 'success', message: 'GET desde rutas PRODUCTS'})
})

//GET by ID
router.get('/:pid', async (req, res) => {
    res.send({status: 'success', message: 'GET by ID desde rutas PRODUCTS'})
})

//POST
router.post('/', async (req, res) => {
    res.send({status: 'success', message: 'POST desde rutas PRODUCTS'})
})

//PUT
router.put('/:pid', async (req, res) => {
    res.send({status: 'success', message: 'PUT desde rutas PRODUCTS'})
})

//DELETE
router.delete('/:pid', async (req, res) => {
    res.send({status: 'success', message: 'DELETE desde rutas PRODUCTS'})
})


module.exports = router
