import {Router} from 'express'
import ProductManager from '../class/ProductManager.js';


const router = Router()
const productManager = new ProductManager('../db/products.json');

router.get('/products', async (req, res) => {
    const products = await productManager.getProducts()
    let limit = req.query.limit
    if (!limit) res.send({products})
    else {
        const prodLimit = [];
        if (limit > products.length) limit = products.length;
        for (let index = 0; index < limit; index++) {
            prodLimit.push(products[index]);
        }
        res.send({prodLimit})
    }
    req.io.emit('updatedProducts', products);

})

router.get('/products/:pid', async (req, res) => {
    const id = req.params.pid
    const product = await productManager.getProductById(id)
    res.send({product})
})
router.post('/', async (req, res) => {
    const {title, description, price, thumbnails, code, stock, category, status} = req.body
    const addProduct = await productManager.addProduct(title, description, price, code, stock, category, status, thumbnails)
    req.io.emit('updatedProducts', await productManager.getProducts());
    res.send(addProduct)

})

router.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const {title, description, price, thumbnails, code, stock, category, status} = req.body
    const updateProduct = await productManager.updateProductById(id, title, description, price, code, stock, category, status, thumbnails)
    req.io.emit('updatedProducts', await productManager.getProducts());
    res.send(updateProduct)
})

router.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const deleteProduct =  await productManager.deleteProductById(id)
    req.io.emit('updatedProducts', await productManager.getProducts());
    res.send(deleteProduct)
})

router.get('/home', async (req, res) =>{
    const products = await productManager.getProducts()
    res.render('home',
    {
        title: "Lista de Productos",
        products: products
    })
})

router.get('/realtimeproducts', async (req, res) =>{
    const products = await productManager.getProducts()
    res.render('realTimeProducts',
    {
        title: "Lista de Productos",
        products: products
    })

})

export default router;










