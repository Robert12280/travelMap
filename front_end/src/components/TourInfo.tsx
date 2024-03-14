import { ReactElement } from "react";
import "./TourInfo.sass";
import axios from "../api/axios";

interface Tour {
    id: string;
    title: string;
    content: string;
    date: string;
    cityName: string;
    images: string[];
}

interface TourInfoProps {
    tour: Tour | null;
    setTour: React.Dispatch<React.SetStateAction<Tour | null>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setTours: React.Dispatch<React.SetStateAction<Tour[]>>;
    tours: Tour[];
}

const TourInfo = (props: TourInfoProps): ReactElement => {
    const { tour, setTour, setIsLoading, setTours, tours } = props;

    const handleDelete = async () => {
        if (tour) {
            try {
                setIsLoading(true);
                await axios.delete(`tour/${tour.id}`);
                setTours(tours.filter((t) => t.id !== tour.id));
                setTour(null);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="tour_info">
            {tour && (
                <>
                    <h1>{tour.title}</h1>
                    <p>{tour.content}</p>
                    <div className="img_container">
                        {tour.images &&
                            tour.images.map((i, index) => (
                                <img src={i} key={index} />
                            ))}
                    </div>
                    <button className="del_btn" onClick={() => handleDelete()}>
                        delete
                    </button>
                </>
            )}
        </div>
    );
};

export default TourInfo;
