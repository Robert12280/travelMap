import { Request, Response } from "express";
import Tour from "../database/models/Tour";
import City from "../database/models/City";
import TourImage from "../database/models/TourImage";
import { uploadFile, getFile, deleteFile } from "../services/s3";

const getAllTour = async (req: Request, res: Response) => {
    const tours = await Tour.findAll({
        attributes: ["id", "title", "content", "date"],
        include: [{ model: City, attributes: ["slug"] }],
    });

    const format = tours.map((tour) => ({
        id: tour.id,
        title: tour.title,
        content: tour.content,
        date: tour.date,
        cityName: tour.city.slug,
    }));
    return res.status(200).json(format);
};

const getTour = async (req: Request, res: Response) => {
    const id = req.params.id;

    const tour = await Tour.findOne({
        where: { id },
        attributes: ["id", "title", "content", "date"],
        include: [TourImage, City],
    });

    if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
    }

    const imgArr = tour?.images.map((i) => i.img_name)!;

    const imgUrlArr = await getFile(imgArr);

    const format = {
        id: tour.dataValues.id,
        title: tour.dataValues.title,
        content: tour.dataValues.content,
        date: tour.dataValues.date,
        cityName: tour.dataValues.city.dataValues.slug,
        images: imgUrlArr,
    };

    console.log(format);

    return res.status(200).json(JSON.stringify(format));
};

const createTour = async (req: Request, res: Response) => {
    const { title, content, date } = req.body;
    if (!title || !date)
        return res.status(400).json({ message: "title or date is required" });
    const city = await City.findOne({
        where: { slug: req.params.city },
    });
    if (!city) {
        return res.status(400).json({ message: "City is not found" });
    }

    const data = {
        city_id: city.id,
        title,
        content,
        date,
    };
    const tour = await Tour.create(data);

    if (req.files) {
        const files = req.files as Express.Multer.File[];
        await Promise.all(
            files.map((file) => {
                return TourImage.create({
                    tour_id: tour.id,
                    img_name: file.filename,
                });
            })
        );
        await uploadFile(files as Express.Multer.File[]);
    }

    return res.status(201).json(tour);
};

const deleteTour = async (req: Request, res: Response) => {
    const id = req.params.id;

    const tour = await Tour.findOne({
        where: { id },
        include: [TourImage],
    });
    if (!tour) return res.status(404).send("Post not found");

    const imgNameArr = tour.images.map((i) => i.img_name);
    await deleteFile(imgNameArr);
    await Tour.destroy({ where: { id } });
    res.status(200).json(tour);
};

export { getAllTour, createTour, getTour, deleteTour };
