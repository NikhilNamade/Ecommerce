import { addProduct_dao, updateProduct_dao } from "../dao/admin.dao.js";

export const addProduct_service = async(name,category,subcategory,quantity,actualPrice,mrp,sizes,productImage)=>{
   const result = await addProduct_dao(name,category,subcategory,quantity,actualPrice,mrp,productImage,sizes);
   return result;
}

export const updateProduct_service = async(newProdcut,id) =>{
   const result = await updateProduct_dao(newProdcut,id);
   return result;
}