const express = require("express");
require("express-async-errors");
const app = express();
const productsRoutes = require("./routes/products");
const storeRoutes = require("./routes/stores");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const isAuthorized = require("./middleware/authorization");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./DB/index");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 5000;
const DBURI = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/stores", storeRoutes);
app.use("/api/v1/users", isAuthorized, userRoutes);
app.use(errorHandler);

app.all("*", (req, res) => {
	res.status(404).send("Resource not found");
});

const startServer = async () => {
	await connectDB(DBURI);
	app.listen(PORT, () => {
		console.log("server listening on port " + PORT);
	});
};
startServer();
