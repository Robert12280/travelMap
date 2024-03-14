import { ReactElement, useEffect, useState } from "react";
import "./Home.sass";
import TaiwanMap from "./TaiwanMap";
import TourInfo from "./TourInfo";
import TourList from "./TourList";
import { Link } from "react-router-dom";
import useAxiosTour from "../hooks/useAxiosTour";
import ReactLoading from "react-loading";

interface Tour {
    id: string;
    title: string;
    content: string;
    date: string;
    cityName: string;
    images: string[];
}

const Home = (): ReactElement => {
    const { tourData, tourIsLoading } = useAxiosTour("tour");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tour, setTour] = useState<Tour | null>(null);
    const [citySelected, setCitySelected] = useState<string>("");
    const [tours, setTours] = useState<Array<Tour>>([]);

    useEffect(() => {
        setTours(tourData);
    }, [tourData, setTours]);

    return (
        <div className="home">
            {isLoading || tourIsLoading ? (
                <ReactLoading
                    type="spin"
                    color="grey"
                    height={100}
                    width={100}
                />
            ) : (
                <>
                    <TaiwanMap
                        setCitySelected={setCitySelected}
                        setTour={setTour}
                    />
                    <div className="tour_container">
                        {tour ? (
                            <TourInfo
                                tour={tour}
                                setIsLoading={setIsLoading}
                                tours={tours}
                                setTours={setTours}
                                setTour={setTour}
                            />
                        ) : (
                            <TourList
                                tourData={tours.filter(
                                    (tour) => tour.cityName === citySelected
                                )}
                                setTour={setTour}
                                setIsLoading={setIsLoading}
                            />
                        )}
                        <div className="btn_container">
                            <Link className="add_btn" to={"add"}>
                                Add
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
