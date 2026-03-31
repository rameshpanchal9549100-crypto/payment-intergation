import express from "express";
import { getkey, paymentVerification, processPayment } from "../controller/productController.js";

const router = express.Router();

router.route("/payment/process").post(processPayment);
router.route("/getkey").get(getkey);
router.route("/paymentVerification").post(paymentVerification)

export default router;