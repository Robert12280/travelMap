import express from "express";
import { getAllCity, createCity } from "../controllers/cityController";

const router = express.Router();

router.route("/").get(getAllCity).post(createCity);

export default router;
