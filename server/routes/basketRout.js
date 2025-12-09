const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verivyJWT")
const { addToBasket,deleteProductFromBasket,getAllBasketOfUser }=require("../controllers/basketController")
router.use(verifyJWT)
router.get("/",getAllBasketOfUser)//read
router.post("/",addToBasket)//
router.delete("/:id",deleteProductFromBasket)//delete product from busket


module.exports = router




