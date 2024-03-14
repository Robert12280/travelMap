import axios from "../api/axios";
import { format } from "date-fns";

export const postTour = (
    files: File[],
    title: string,
    content: string,
    date: Date,
    city: string
): Promise<any> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", format(date, "yyyy-MM-dd"));

    return axios.post(
        `/tour/${city}?date=${format(date, "yyyy-MM-dd")}`,
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
};
