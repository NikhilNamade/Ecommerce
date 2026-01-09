import { axiosInstance } from "../helper/axiosInstance.helper";

export const saveProduct = async (formdata) => {
        let result = await axiosInstance.post("/auth/admin/addProduct",formdata);
        return result;
};


export const AllProducts = async()=>{
    let result = await axiosInstance.get("/auth/admin/allprodcuts");
    return result;
}

export const DeleteProduct = async(id)=>{
    let result = await axiosInstance.delete(`/auth/admin/removeProduct/${id}`)
    return result;
}

export const updateEvent = async(formdata,id)=>{
    let result = await axiosInstance.put(`/auth/admin/updateProduct/${id}`,formdata);
        return result;
}

export const getAllOrders = async()=>{
    let result = await axiosInstance.get('/api/order/getallOrders');
    return result;
}

export const updateStatus = async(id,data)=>{
    let result  = await axiosInstance.patch(`/api/order/updateStatus/${id}`,data);
    return result;
}

export const addCoupons = async(data)=>{
    let result = await axiosInstance.post("/api/coupon/addCoupons",data);
    return result;
}

export const getCoupons = async()=>{
    let result = await axiosInstance.get("/api/coupon/getCoupons");
    return result.data;
}