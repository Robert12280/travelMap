import { Request, Response } from "express";
import City from "../database/models/City";
import Tour from "../database/models/Tour";

const getAllCity = async (req: Request, res: Response) => {
    const cities = await City.findAll({ include: [Tour] });
    return res.status(200).json(cities);
};

const createCity = async (req: Request, res: Response) => {
    const city = await City.create(req.body);
    return res.status(201).json(city);
};

export { getAllCity, createCity };
