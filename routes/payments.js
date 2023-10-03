import { Router } from "express";
import {createOrder10, receiveWebhook10} from "../controllers/payments/paymentController.js";



const router = Router()

router.post("/create-order10", createOrder10)
router.get("/success", (req, res) => res.send("success"))
router.get("/pending", (req, res) => res.send("pending"))
router.get("/failure", (req, res) => res.send("failure"))
router.post("/webhook", receiveWebhook10)

export default router