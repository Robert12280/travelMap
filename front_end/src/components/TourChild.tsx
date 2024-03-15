import { ReactElement } from "react";
import "./TourChild.sass";
import axios from "../api/axios";

interface TourProps {
    setTour: React.Dispatch<React.SetStateAction<Tour | null>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    tour: Tour;
}

const Tour = (props: TourProps): ReactElement => {
    const { tour, setTour, setIsLoading } = props;
    const tourClick = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`tour/${tour.id}`);
            setTour(JSON.parse(response.data));
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <li onClick={tourClick}>
            <h1>{tour.title}</h1>
            <p>{tour.date}</p>
        </li>
    );
};

export default Tour;
