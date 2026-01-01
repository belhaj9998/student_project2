import express from "express";
import { config } from "./config/app.config";
import { loggerMiddleware } from "./middlewares/loggermiddleware";
import departmentRoutes from "./routers/departmentRoute";
import studentRoutes from "./routers/studentRoute";
const app = express();

// Middlewares
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/departments", departmentRoutes);
app.use("/students",studentRoutes);
// Root route
app.get("/", (req, res) => {
    res.send("Welcome to Student Management API");
});

const PORT = config.port;

app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`http://localhost:${PORT}`);
    console.log(`${config.appName} is running on port ${PORT} `)

});
