import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const client = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});
export async function POST(request: Request) {
  try {
    const { fileName, fileType } = await request.json();
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET,
      Key: fileName,
      ContentType: fileType,
    });
    const signedUrl = await getSignedUrl(client, command, {
      expiresIn: 60 * 5,
    });
    return Response.json({ signedUrl, fileName });
  } catch (error) {
    Response.json({ error: error });
  }
}
