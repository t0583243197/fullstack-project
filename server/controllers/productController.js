const Basket = require("../models/Basket")
const Product = require("../models/Product")

const getAllProducts = async (req, res) => {
    res.json(await Product.find())
}
const getProductById = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product)
        return res.status(400).send("product not found")
    res.json(product)
}

const creatNewProduct = async (req, res) => {
    const { name, barcode, description, price, image, type } = req.body
    if (!name || !barcode || !description || !price || !image || !type)
        return res.status(400).send("all fields are required")
    await Product.create({ name, barcode, description, price, image, type })
    res.json("new product was created")
}
const deleteProduct = async (req, res) => {
    const { id } = req.params
    let flag=true
    if (!id)
        return res.status(400).send("id is undefined")
    // console.log(id);
    const product1 = await Product.findById(id).exec()
    if (!product1)
        return res.status(400).send("product not found")
    // console.log(product1);
    const basketsproduct=await Basket.find().lean()
    for (let index = 0; index < basketsproduct.length; index++) {
        for (let index1 = 0; index1 < basketsproduct[index].products.length; index1++) {
           if( basketsproduct[index].products[index1].productId==id){
            flag=false
            break
        }
        }
    }
  if (flag==true){
    const result = await product1.deleteOne()
// console.log(result);
    // res.json({"product deleted!!!!!!!!!!😍":res})
    res.json("delete" + result)
}
else{
    return res.status(400).send("product can not be deleted because someone already ordered it👌")
}
}

const updateProduct = async (req, res) => {
    const {id, name, barcode, description, type, image, price } = req.body
    if (!id)
        return res.status(400).send("id is not defined😒")
    const product = await Product.findById(id)
    if (!product)
        return res.status(400).send("product not found😂")

    product.name = name ? name : product.name
    product.barcode = barcode ? barcode : product.barcode
    product.description = description ? description : product.description
    product.type = type ? type : product.type
    product.image = image ? image : product.image
    product.price = price ? price : product.price
    await product.save()
    res.json("product was updated!😊")
}

module.exports = { updateProduct, deleteProduct, creatNewProduct, getAllProducts, getProductById }