const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
	orderName: {
		type: String,
	},

	orderPrice: {
		type: Number,
	},
	restaurantId: {
		type: String,
	},
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
