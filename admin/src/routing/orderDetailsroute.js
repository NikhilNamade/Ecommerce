import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routtree";
import Home from "../pages/Home";
import OrderDetails from "../componenets/OrderDetails";

export const OrderDetailsRoute = createRoute({
    getParentRoute : ()=>rootRoute,
    path:"/orders/$orderId",
    component:OrderDetails
})