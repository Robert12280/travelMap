import { useState, useEffect } from "react";
import axios from "../api/axios";

interface Tour {
    id: string;
    title: string;
    content: string;
    date: string;
    cityName: string;
    images: string[];
}

const useAxiosTour = (dataUrl: string) => {
    const [tourData, setTourData] = useState<Array<Tour>>([]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async (url: string) => {
            try {
                const response = await axios.get(url, {
                    signal: controller.signal,
                });
                setTourData(response.data);
            } catch (err) {
                setTourData([]);
            }
        };

        fetchData(dataUrl);

        const cleanUp = () => {
            console.log("clean up function");
            controller.abort();
        };

        return cleanUp;
    }, [dataUrl]);

    return { tourData };
};

export default useAxiosTour;
