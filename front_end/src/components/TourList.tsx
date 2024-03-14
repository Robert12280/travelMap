import { ReactElement } from "react";
import "./TourList.sass";
import TourChile from "./TourChild";

interface Tour {
    id: string;
    title: string;
    content: string;
    date: string;
    cityName: string;
    images: string[];
}

interface TourListProps {
    setTour: React.Dispatch<React.SetStateAction<Tour | null>>;
    tourData: Tour[];
}

const TourList = (props: TourListProps): ReactElement => {
    const { tourData, setTour } = props;
    return (
        <div className="tour_list">
            <ul>
                {tourData.map((tour) => (
                    <TourChile key={tour.id} tour={tour} setTour={setTour} />
                ))}
            </ul>
        </div>
    );
};

export default TourList;
