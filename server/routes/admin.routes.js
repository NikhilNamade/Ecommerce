import express from "express"
import { addProduct,delteProduct,getAllProducts, updateProduct} from "../controller/admin.controller.js";
import { upload } from "../helper/multer.helper.js";
const router = express.Router();


router.post("/addProduct",upload.single("productImage"),addProduct)
router.get("/allprodcuts",getAllProducts);
router.put("/updateProduct/:id",upload.single("productImage"),updateProduct)
router.delete("/removeProduct/:id",delteProduct)

export default router;