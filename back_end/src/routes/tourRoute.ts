import express from "express";
import {
    getAllTour,
    createTour,
    getTour,
    deleteTour,
} from "../controllers/tourController";
import multer, { Multer } from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/uploads/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

const upload: Multer = multer({ storage: storage });

const router = express.Router();

router.route("/").get(getAllTour);
router.route("/:city").post(upload.array("files"), createTour);
router.route("/:id").get(getTour).delete(deleteTour);

export default router;
