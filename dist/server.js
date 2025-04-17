"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const foodRoutes_1 = require("./routes/foodRoutes");
const categoryRoutes_1 = require("./routes/categoryRoutes");
const orderRoutes_1 = require("./routes/orderRoutes");
const cors_1 = __importDefault(require("cors"));
const authenticationRoutes_1 = require("./routes/authenticationRoutes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
const allowedOrigins = [
    "http://localhost:3000",
    "https://frontend-food-delivery-ggqvcwjy7-ursa0112s-projects.vercel.app"
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true
}));
app.use('/api/v1/food', foodRoutes_1.foodRouter);
app.use('/api/v1/category', categoryRoutes_1.categoryRouter);
app.use('/api/v1/order', orderRoutes_1.orderRouter);
app.use('/api/v1/auth', authenticationRoutes_1.authRouter);
app.get('/api/v1', (req, res) => {
    res.status(200).json({ success: true, message: 'Base URL is working' });
});
(0, database_1.default)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
});
