import app from "./services/app";
import dotenv from "dotenv";
import { conn } from "./database/db";
dotenv.config();
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

app.listen(PORT, async () => {
    await conn();
    console.log(`server is running on ${PORT}`);
});
