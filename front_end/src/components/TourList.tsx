import { ReactElement } from "react";
import "./TourList.sass";
import TourChile from "./TourChild";

interface TourListProps {
    setTour: React.Dispatch<React.SetStateAction<Tour | null>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    tourData: Tour[];
}

const TourList = (props: TourListProps): ReactElement => {
    const { tourData, setTour, setIsLoading } = props;
    return (
        <div className="tour_list">
            <ul>
                {tourData.map((tour) => (
                    <TourChile
                        key={tour.id}
                        tour={tour}
                        setTour={setTour}
                        setIsLoading={setIsLoading}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TourList;
