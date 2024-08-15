import  express  from 'express';
import userRoutes from "./routes/user"
const app = express();


app.use("/api/v1/user", userRoutes);
