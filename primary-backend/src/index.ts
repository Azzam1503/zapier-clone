import  express  from 'express';
import userRoutes from "./routes/user"
import zapRoutes from "./routes/zap"
import cors from "cors";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/zap", zapRoutes);

app.listen(PORT, () => {
    console.log(`Server is runnig on PORT ${PORT}`);
});
