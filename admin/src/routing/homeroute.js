import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routtree";
import Home from "../pages/Home";

export const homeroute = createRoute({
    getParentRoute : ()=>rootRoute,
    path:"/",
    component:Home
})