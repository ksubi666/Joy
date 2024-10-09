import { S3Client, ListBucketsCommand, PutObjectAclCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextApiRequest, NextApiResponse } from "next";

const client = new S3Client({ 
    endpoint: process.env.R2_ENDPOINT,
    region: 'auto',
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY as string,
        secretAccessKey:process.env.R2_SECRET_ACCESS_KEY as string
    }
})
export async function POST(request: Request) {
    try {
        const { fileName, fileType } = await request.json () 
            try {
            const command = new PutObjectCommand ( {
            Bucket: process.env.BUCKET,
            Key: fileName,
            ContentType: fileType,
        });
        const signerUrl = await getSignedUrl(client, command, {
            expiresIn: 60*5,
        });
    }
    catch (error) {
        Response.json( { error: 'error' });
    }
    return Response.json({ hello: 'world'});
}
    }
