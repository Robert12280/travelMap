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
    const [tourIsLoading, setTourIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async (url: string) => {
            try {
                setTourIsLoading(true);
                const response = await axios.get(url, {
                    signal: controller.signal,
                });
                setTourData(response.data);
            } catch (err) {
                setTourData([]);
            } finally {
                setTourIsLoading(false);
            }
        };

        fetchData(dataUrl);

        const cleanUp = () => {
            console.log("clean up function");
            controller.abort();
        };

        return cleanUp;
    }, [dataUrl]);

    return { tourData, tourIsLoading };
};

export default useAxiosTour;
