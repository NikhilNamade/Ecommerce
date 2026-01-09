import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routtree";
import AddProdcut from "../pages/AddProdcut";

export const addProductRoute = createRoute({
    getParentRoute : ()=> rootRoute,
    path:"/addProducts",
    component:AddProdcut
})