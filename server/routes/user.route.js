import express from "express"
import { get_user_controller, login_controller, register_controller,update_controller} from "../controller/user.controller.js";
import { authToken } from "../helper/jwt.helper.js";

const router = express.Router();

router.post("/login",login_controller)
router.post("/register",register_controller)
router.put("/update/:id",update_controller)
router.get("/getUser",authToken,get_user_controller);
export default router;