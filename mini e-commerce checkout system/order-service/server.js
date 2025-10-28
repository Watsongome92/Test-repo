const express = require("express");
//const cors = require("cors"); //allow cross-origin for front end intergration
const app = express();
const PORT = 5001; //different port so other services can run separately

//middleware
app.use(express.json());
//app.use(cors());

//routes
const ordersRoute = require("./routes/orders");
app.use("/api/orders", ordersRoute);

//health check
app.get("/health", (req, res) => {
    res.json({ status: "order service is running" });
});

//start server
app.listen(PORT, () => {
    console.log(`orders service running at http://localhost:${PORT}`);
});