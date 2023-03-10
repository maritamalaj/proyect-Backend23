const express = require ('express');
const ProductManager = require ('../ProductManager')
const app = express ();
const PORT = 8080
const productManager = ProductManager ('./files/products.json')

app.use(express.urlencoded({extended:true}))

pp.get ("/", async (req, res)=> {
    const products = await productManager.getProducts();
    const {limit} = req.query
    if (limit) return res.json(products.slice(0,limit));
    else return res.json(products);
});

app.get("/products/:pid", async (req,res)=>{
    const products = await productManager.getProducts();
    const {pid} = req.parms
    const product = products.find (product => product.id === pid);

    if (product) return res.status(200).json(product);
    else return res.status(404).json ({message : "product not found"});

});

app.listen(PORT,()=>{
    console.log (`Server runing pn port ${PORT}`);

});








app.listen (PORT, () =>{
    console.log(`Server on port : ${PORT}`);
  })
  