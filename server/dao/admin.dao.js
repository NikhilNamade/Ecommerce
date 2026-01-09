import Products from "../model/product.model.js"

export const  addProduct_dao = async(name,category,subcategory,quantity,actualPrice,mrp,productImage,sizes)=>{
    const price = {
        actualPrice,
        mrp
    };

    let newProduct = new Products({
        name,
        category,
        subcategory,
        quantity,
        price,
        productImage:productImage,
        sizes:sizes
    });

    await newProduct.save();
    return newProduct;
}

export const getAllProducts_dao = async()=>{
    let result = await Products.find();
    return result;
}

export const updateProduct_dao = async(newProduct,id)=>{
    let result = await Products.findByIdAndUpdate(id,newProduct)
    return result;
}

export const deleteProduct_dao = async(id)=>{
    return await Products.findByIdAndDelete(id);
}