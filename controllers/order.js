const Order = require("../models/Order");

exports.orders = async (req, res, next) => {
	try {
		const store = await Order.find();

		res.status(200).json({
			success: true,
			orders: store,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.createOrder = async (req, res, next) => {
	const { orderName, orderPrice, restaurantId } = req.body;

	try {
		const order = await Order.create({
			orderName,
			orderPrice,
			restaurantId,
		});

		res.status(201).json({
			success: true,
			order: order,
		});
	} catch (error) {
		next(error);
	}
};

exports.getOrder = async (req, res, next) => {
	const id = req.params.orderId;

	try {
		const order = await Order.findOne({ _id: id });

		if (!order) {
			res.send(401).json({
				success: false,
				error: "Invalid OrderId!!",
			});
		}

		res.status(200).json({
			success: true,
			order: order,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateOrder = async (req, res, next) => {
	const id = req.params.orderId;

	try {
		const order = await Order.findOne({
			_id: id,
			restaurantId: req.body.restaurantId,
		});

		if (!order) {
			res.send(401).json({
				success: false,
				error: "Invalid OrderId Or RestaurantId!!",
			});
		}
		order.orderName = req.body.orderName;
		order.orderPrice = req.body.orderPrice;
		await order.save();

		res.status(201).json({
			success: true,
			order: order,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteOrder = async (req, res, next) => {
	const id = req.params.orderId;

	try {
		const order = await Order.findOne({ _id: id });

		if (!order) {
			res.send(401).json({
				success: false,
				error: "Invalid OrderId!!",
			});
		}
		
		await order.remove();

		res.status(200).json({
			success: true,
			message: "Order removed!!",
		});
	} catch (error) {
		next(error);
	}
};

exports.restaurantOrders = async (req, res, next) => {
	const id = req.params.restaurantId;

	try {
		const order = await Order.find({ restaurantId: id });

		if (!order) {
			res.send(401).json({
				success: false,
				error: "Invalid RestaurantId!!",
			});
		}

		res.status(200).json({
			success: true,
			order: order,
		});
	} catch (error) {
		next(error);
	}
};
