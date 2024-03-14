import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME as string;
const region = process.env.AWS_BUCKET_REGION as string;
const accessKeyId = process.env.AWS_ACCESS_KEY as string;
const secretAccessKey = process.env.AWS_SECRET_KEY as string;

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

export async function uploadFile(files: Express.Multer.File[]): Promise<void> {
    const promises = files.map((file) => {
        const fileStream = fs.createReadStream(file.path);

        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.filename,
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);

        return s3.send(command);
    });
    await Promise.all(promises);
}

export async function getFile(imgNameArr: string[]): Promise<string[]> {
    const result: string[] = [];
    for (const imgName of imgNameArr) {
        const getParams = {
            Bucket: bucketName,
            Key: imgName,
        };
        const command = new GetObjectCommand(getParams);
        const url = await getSignedUrl(s3, command);
        result.push(url);
    }

    return result;
}

export async function deleteFile(imgNameArr: string[]): Promise<void> {
    const promises = imgNameArr.map((imgName) => {
        const deleteParams = {
            Bucket: bucketName,
            Key: imgName,
        };

        const command = new DeleteObjectCommand(deleteParams);

        return s3.send(command);
    });
    await Promise.all(promises);
}
