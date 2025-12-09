const Basket = require("../models/Basket")
const Product = require("../models/Product")
//get
const getAllBasketOfUser = async (req, res) => {
    const userId = req.user._id
    const myBasket = await Basket.findOne({userId}).populate("products.productId").lean()
    if (!myBasket) {
        return res.status(404).json({ message: 'Basket not found for this user.' });
    }
    return res.json(myBasket)
}
//addToBasket
const addToBasket = async (req, res) => {
    const { productId } = req.body

    const foundBasket = await Basket.findOne({ userId: req.user._id })
    // console.log("foundBasket" + foundBasket);
    if (foundBasket) {
        let isExist = false
        foundBasket.products = foundBasket.products.map((p) => {
            if (p.productId == productId) {
                isExist = true
                return { productId, quantity: p.quantity + 1 }
            }
            return p
        })
        if (!isExist) {
            const existProduct = await Product.findOne({ _id: productId })
            if (!existProduct) {
                return res.status(404).json("prod not found")
            }
            foundBasket.products.push({ productId: existProduct._id, quantity: 1 })
        }
        await foundBasket.save()
        return res.json("מוצר נוסף בהצלחה")
    }
    else {
        const newBasket = { userId: req.user._id, products: [] }
        await Basket.create(newBasket)
        return await addToBasket(req, res)
    }
}
//delete
const deleteProductFromBasket = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).send("id is undefined")
    const basket = await Basket.findOne({ userId: req.user._id })
    if (!basket)
        return res.status(400).send("no basket found")
    //אם הגעת עד כאן סימן שנמצא סל עם מערך מוצרים
    const prod = basket.products.find(p => p._id == id)
    if (!prod)
        return res.status(404).json("prod not found in basket")
    if (prod.quantity === 1) {
        basket.products = basket.products.filter((product) => product._id != id)
    }
    else {
        basket.products = basket.products.map((p) => {
            if (p._id == id) {
                return { ...p, quantity: p.quantity - 1 }
            }
            return p
        })
    }
    const saveBasket = await basket.save()
    res.json({ saveBasket: saveBasket })
}

module.exports = { deleteProductFromBasket, getAllBasketOfUser, addToBasket }