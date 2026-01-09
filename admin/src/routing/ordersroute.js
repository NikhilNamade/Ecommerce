import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routtree";
import AddProdcut from "../pages/AddProdcut";
import Orders from "../pages/Orders";

export const ordersRoute = createRoute({
    getParentRoute : ()=> rootRoute,
    path:"/orders",
    component:Orders
})