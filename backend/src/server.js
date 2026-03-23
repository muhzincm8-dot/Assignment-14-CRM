import express from 'express'
import dotenv from 'dotenv';
import authRoute from './routes/authRoutes.js'
import cors from 'cors';
import { dbConnect } from './config/db.js';
import customerRoute from './routes/customerRoutes.js'
import { validateToken } from './middlewares/authMiddleware.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
    // origin: ["https://assignment-14-crm-9m7t.vercel.app"], 
    // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    // credentials: true
}));

app.get('/', (req, res) => {
    res.json({ msg: "Home page crms" });
})

app.use('/api', authRoute);
app.use('/api/customers', validateToken, customerRoute);

dbConnect();

if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;