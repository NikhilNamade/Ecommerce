import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routtree";
import AddProdcut from "../pages/AddProdcut";
import Coupons from "../pages/Coupons";

export const couponRoute = createRoute({
    getParentRoute : ()=> rootRoute,
    path:"/coupons",
    component:Coupons
})