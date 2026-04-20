//1. Core packages
import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import adminRoutes from './routes/adminRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

//mongodb connection establishment
connectDB();

const app = express();

app.use(
  cors({
    origin : "http://localhost:5173",
    credentials: true,
  })
)

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended: true}));

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRoutes);

app.use("/auth", authRouter);
app.use("/admin", adminRoutes);

import foodRoutes from "./routes/foodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

app.use("/api/food", foodRoutes);
app.use("/api/orders", orderRoutes);

app.use("/food", foodRoutes);
app.use("/orders", orderRoutes);
//Get the value of the variable named PORT from my environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log(`Server is running on PORT ${PORT}`)
})

export default app;