import { ReactElement } from "react";
import "./TourInfo.sass";

// interface TourInfoProps {
//     id: string
//     title: string;
//     content: string;
//     date: string;
//     cityName: string;
//     images: string[];
// }

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
}

const TourInfo = (props: TourInfoProps): ReactElement => {
    const { tour } = props;
    console.log(tour);
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
                </>
            )}
        </div>
    );
};

export default TourInfo;
