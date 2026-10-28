import dotenv from "dotenv"
import express from "express"
import {ConnectionDb} from "./config/db.js"
import cors from "cors";
import apii from "./routes/DemoRoute.js";

dotenv.config();

const app = express();

app.use(cors())

app.use(express.json())

ConnectionDb();

app.use("/api/collect",apii)

const PORT =process.env.PORT||3000

app.listen(PORT,()=>{
    console.log(`Server Runnning Successfully at http://localhost:${PORT}`);
    
})

export default app;

// http://localhost/5000
