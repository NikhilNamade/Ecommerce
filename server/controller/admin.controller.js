import { json } from "express";
import { deleteProduct_dao, getAllProducts_dao } from "../dao/admin.dao.js";
import { uploadCloudinary } from "../helper/multer.helper.js";
import {
  addProduct_service,
  updateProduct_service,
} from "../services/admin.services.js";
import { wrapAsyncHandler } from "../utils/errorhandling.utils.js";
export const addProduct = wrapAsyncHandler(async (req, res) => {
  try {
    const { name, category, subcategory, quantity, actualPrice, mrp, sizes } =
      req.body;
    const result = await uploadCloudinary(req.file);
    console.log(req.body);
    console.log(result.secure_url);
    let newProduct = await addProduct_service(
      name,
      category,
      subcategory,
      quantity,
      actualPrice,
      mrp,
      JSON.parse(sizes),
      result.secure_url
    );
    res.json({ success: true, product: newProduct });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getAllProducts = wrapAsyncHandler(async (req, res) => {
  try {
    let products = await getAllProducts_dao();
    res.json({ success: true, Products: products });
  } catch (error) {
    throw error;
  }
});

export const updateProduct = wrapAsyncHandler(async (req, res) => {
  try {
    let { name, category, quantity, actualPrice, mrp, productImage, sizes } =
      req.body;
    if (sizes) {
      sizes = JSON.parse(sizes);
    }
    const updatedProduct = {
      name,
      category,
      quantity,
      price: {
        actualPrice,
        mrp,
      },
      sizes,
      productImage: "",
    };
    if (req.file) {
      let result = await uploadCloudinary(req.file);
      updateProduct.productImage = result.secure_url;
    } else {
      updatedProduct.productImage = productImage;
    }
    let id = req.params.id;
    let result = await updateProduct_service(updatedProduct, id);
    res.json({ success: true, updatedProduct: result });
  } catch (error) {
    throw error;
  }
});

export const delteProduct = wrapAsyncHandler(async (req, res) => {
  try {
    let id = req.params.id;
    let result = await deleteProduct_dao(id);
    res.json({ success: !!result });
  } catch (error) {
    throw error;
  }
});
