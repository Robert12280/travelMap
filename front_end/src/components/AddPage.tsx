import React, { ReactElement, useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import "./AddPage.sass";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { postTour } from "../services/postTour";
import ReactLoading from "react-loading";

const AddPage = (): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [imagePreviews, setImagePreviews] = useState<Array<string>>([]);
    const [city, setCity] = useState<string>("taipei_city");
    const [date, setDate] = useState<Date | null>(new Date());
    const navigate = useNavigate();

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedFiles && date) {
            try {
                setIsLoading(true);
                await postTour(selectedFiles, title, content, date, city);
                navigate("/");
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const onDrop = useCallback(
        (acceptedFiles: Array<File>) => {
            let images: Array<string> = [];
            acceptedFiles.forEach((file) => {
                images.push(URL.createObjectURL(file));

                setImagePreviews(images);
            });
            setSelectedFiles([...selectedFiles, ...acceptedFiles]);
        },
        [selectedFiles]
    );

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: {
            "image/*": [],
        },
    });

    const fileDeleted = (img: string, index: number) => {
        let images: Array<string> = imagePreviews;
        let files: Array<File> = selectedFiles;
        files.splice(index, 1);
        setSelectedFiles(files);
        setImagePreviews(images.filter((i) => i !== img));
        URL.revokeObjectURL(img);
    };

    const baseStyle = {
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "20px",
        borderWidth: 2,
        borderRadius: 2,
        borderColor: "#aaa",
        borderStyle: "dashed",
        backgroundColor: "#fafafa",
        color: "#bdbdbd",
        outline: "none",
        transition: "border .24s ease-in-out",
    };

    const focusedStyle = {
        borderColor: "#2196f3",
    };

    const acceptStyle = {
        borderColor: "#00e676",
    };

    const rejectStyle = {
        borderColor: "#ff1744",
    };

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    return (
        <>
            {isLoading ? (
                <ReactLoading
                    type="spin"
                    color="grey"
                    height={100}
                    width={100}
                />
            ) : (
                <>
                    <Link id="back" to={"/"}>
                        <IoArrowBack />
                    </Link>
                    <form className="add_form" onSubmit={submit}>
                        <label htmlFor="title">標題</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <label htmlFor="content">內容</label>
                        <textarea
                            id="content"
                            placeholder="Enter content..."
                            rows={10}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <select
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option value="taipei_city">台北市</option>
                            <option value="miaoli_country">苗栗縣</option>
                            <option value="taichung_city">台中市</option>
                            <option value="chiayi_city">嘉義市</option>
                            <option value="yilan_country">宜蘭縣</option>
                            <option value="hsinchu_country">新竹縣</option>
                            <option value="pingtung_country">屏東縣</option>
                            <option value="taoyuan_city">桃園市</option>
                            <option value="nantou_country">南投縣</option>
                            <option value="kaohsiung_city">高雄市</option>
                            <option value="keelung_city">基隆市</option>
                            <option value="tainan_city">台南市</option>
                            <option value="hsinchu_city">新竹市</option>
                            <option value="new_taipei_city">新北市</option>
                            <option value="hualien_country">花蓮縣</option>
                            <option value="chiayi_country">嘉義縣</option>
                            <option value="taitung_country">台東縣</option>
                            <option value="changhua_country">彰化縣</option>
                            <option value="penghu_country">澎湖縣</option>
                        </select>
                        <input
                            type="date"
                            id="date"
                            value={date ? format(date, "yyyy-MM-dd") : ""}
                            onChange={(e) =>
                                setDate(
                                    e.target.value
                                        ? new Date(e.target.value)
                                        : null
                                )
                            }
                            required
                        />
                        <div
                            className="file_container"
                            {...getRootProps({ style })}
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>拖曳檔案到這裡...</p>
                            ) : (
                                <p>點擊選取檔案或拖曳檔案</p>
                            )}
                        </div>
                        {imagePreviews && (
                            <div className="img_preview_container">
                                {imagePreviews.map((img, index) => {
                                    return (
                                        <div
                                            className="img_preview"
                                            key={index}
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    fileDeleted(img, index)
                                                }
                                            >
                                                x
                                            </button>
                                            <img src={img} />
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <button id="submit" type="submit">
                            Submit
                        </button>
                    </form>
                </>
            )}
        </>
    );
};

export default AddPage;
