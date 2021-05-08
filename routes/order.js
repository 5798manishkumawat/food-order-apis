const express = require("express");
const router = express.Router();

const {
	orders,
	createOrder,
	getOrder,
	updateOrder,
	restaurantOrders,
	deleteOrder
} = require("../controllers/order");

router.route("/orders").get(orders);
router.route("/new/order").post(createOrder);
router.route("/order/:orderId").get(getOrder);
router.route("/update/:orderId").put(updateOrder);
router.route("/remove/:orderId").delete(deleteOrder);
router.route("/orders/:restaurantId").get(restaurantOrders);

module.exports = router;
