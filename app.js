const fs = require('fs')



class ProductManager{
    static globalId = 0
    constructor (fileName) {
        this.products= []
        this.path = './files'
        this.fileName = this.path + fileName
}

//methods



addProduct = async  (title, description, price, thumbnail, code, stock) => {
    //create dir 
    await fs.promises.mkdir(this.path, { recursive: true })

    if (!(title, description, price, thumbnail, code, stock)) {
        console.log('All fields are required')
    } else 
          if (this.products.find ((prod)=> prod.code == code)){
        console.log('This product already exists.')
    

    
    }else{
        const prodId = ProductManager.globalId ++
        this.products.push ({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            prodId,
        })
        await fs.promises.writeFile(this.fileName, JSON.stringify (this.products))
        console.log('Product added');

    }
}
 

getProducts = async () => {
    let result = await fs.promises.readFile(this.fileName)
    let paresedResult = await json.parse (result)
    console.log('Read file');
    return paresedResult
}

getProductById = async(id) => {
    let result = await fs.promises.readFile(this.fileName)
    let paresedResult = await JSON.parse(result)

    const filteredArr = paresedResult.find(
        (product) => product.prodId == id
    )
    return filteredArr ? filteredArr : ''
  }
    
       
}

updateProductById = async (id, updatedData) => {
    let result = await fs.promises.readFile(this.fileName)
    let paresedResult = await JSON.parse(result)

    if (await this.getProductById(id)) {
      const newArr = paresedResult.map((item) => {
        return id == item.prodId ? { ...item, ...updatedData } : item
        console.log('Product updated ')
      })
      await fs.promises.writeFile(this.fileName, JSON.stringify(newArr))
    } else {
      console.log(`Product ID ${id} does not exist`)
    }
  

  deleteProductById = async (id) => {
    let result = await fs.promises.readFile(this.fileName)
    let paresedResult = await JSON.parse(result)

    if (await this.getProductById(id)) {
      const newArr = paresedResult.filter((item) => item.prodId !== id)
      await fs.promises.writeFile(this.fileName, JSON.stringify(newArr))
      console.log('Product deleted ')
    } else {
        console.log(`Product ID ${id} does not exist`)
    }
  }

}



