import { Router } from "express";
import __dirname from '../utils.js';
import CartManager from '../class/CartManager.js'


const router = Router ();
const cartManager = new CartManager (__dirname+'db/carts.json');



router.post('/', async (req, res) => {
    const newCart = await cartManager.addCart()
    res.send({newCart})
})

router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid
    const selCart = await cartManager.getCartById(cartId)
    res.send({selCart})
})

router.get('/', async (req, res) => {
    const carts = await cartManager.getCarts()
    res.send({carts})
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid
    const productId = parseInt(req.params.pid)
    await cartManager.addProductById(cartId,productId,1)
    const selCart = await cartManager.getCartById(cartId)
    res.send({selCart})
})
export default router;