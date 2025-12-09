const express = require("express")
const router = express.Router()
const verifyJWTAdmin = require("../middleware/verivyJWTAdmin")
const{ deleteProduct,  getAllProducts,  creatNewProduct, getProductById ,updateProduct}=require("../controllers/productController")


router.get("/",getAllProducts)
router.get("/:id",getProductById)

router.use(verifyJWTAdmin)
router.delete("/:id",deleteProduct)
router.post("/",creatNewProduct)
router.put("/",updateProduct)



module.exports = router