import { createRootRoute } from "@tanstack/react-router"
import App from "../App"
import { homeroute } from "./homeroute"
import { addProductRoute } from "./addProductroute"
import { ordersRoute } from "./ordersroute"
import { OrderDetailsRoute } from "./orderDetailsroute"
import { couponRoute } from "./couponsroute"

export const rootRoute = createRootRoute({
    component:App
})

export const routeTree = rootRoute.addChildren([
  homeroute,
  addProductRoute,
  ordersRoute,
  OrderDetailsRoute,
  couponRoute,
])