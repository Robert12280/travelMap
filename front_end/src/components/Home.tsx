import { ReactElement, useState } from "react";
import "./Home.sass";
import TaiwanMap from "./TaiwanMap";
import TourInfo from "./TourInfo";
import useAxiosTour from "../hooks/useAxiosTour";
import TourList from "./TourList";
import { Link } from "react-router-dom";

interface Tour {
    id: string;
    title: string;
    content: string;
    date: string;
    cityName: string;
    images: string[];
}

const Home = (): ReactElement => {
    const { tourData } = useAxiosTour("tour");
    const [tour, setTour] = useState<Tour | null>(null);
    const [citySelected, setCitySelected] = useState<string>("");
    return (
        <div className="home">
            <TaiwanMap setCitySelected={setCitySelected} setTour={setTour} />
            <div className="tour_container">
                {tour ? (
                    <TourInfo tour={tour} />
                ) : (
                    <TourList
                        tourData={tourData.filter(
                            (tour) => tour.cityName === citySelected
                        )}
                        setTour={setTour}
                    />
                )}
                <div className="btn_container">
                    <Link className="add_btn" to={"add"}>
                        Add
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
