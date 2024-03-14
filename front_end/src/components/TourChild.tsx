import { ReactElement } from "react";
import "./TourChild.sass";
import axios from "../api/axios";

interface Tour {
    id: string;
    title: string;
    content: string;
    date: string;
    cityName: string;
    images: string[];
}

interface TourProps {
    setTour: React.Dispatch<React.SetStateAction<Tour | null>>;
    tour: Tour;
}

const Tour = (props: TourProps): ReactElement => {
    const { tour, setTour } = props;
    const tourClick = async () => {
        const response = await axios.get(
            `tour/${tour.cityName}?date=${tour.date}`
        );
        console.log(response.data);
        setTour(JSON.parse(response.data));
    };
    return (
        <li onClick={tourClick}>
            <h1>{tour.title}</h1>
            <p>{tour.date}</p>
        </li>
    );
};

export default Tour;
