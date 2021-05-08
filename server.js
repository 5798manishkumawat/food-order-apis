require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
// const options = {
// 	definition: {
// 		openapi: "3.0.0",
// 		info: {
// 			title: "Orders API",
// 			version: "1.0.0",
// 			description: "A Simple Express Library API",
// 		},
// 		servers: [
// 			{
// 				url: "http://localhost:5000",
// 			},
// 		],
// 	},
// 	apis: ["./routes/*.js"],
// };

const swaggerDocument = require("./swagger.json");

// const specs = swaggerJsDoc(options);

app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/", require("./routes/order"));

const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
	console.log(`Logged Error: ${err}`);
});
