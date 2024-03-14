import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import cityRoute from "../routes/cityRoute";
import tourRoute from "../routes/tourRoute";
import path from "path";

const app: Express = express();
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Hello Node!");
});
app.use("/city", cityRoute);
app.use("/tour", tourRoute);

export default app;
