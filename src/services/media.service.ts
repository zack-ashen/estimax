import db from '@/db';
import { media } from '@/db/schema';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_ACCESS_SECRET!,
  },
  region: process.env.AWS_REGION!,
});

const mediaService = {
  async uploadMany(files: File[], folder: string): Promise<string[]> {
    const bucket = process.env.AWS_BUCKET_NAME!;
    const keys: { key: string }[] = await Promise.all(
      files.map(async (file) => {
        const Body = (await file.arrayBuffer()) as Buffer;
        const key = `${folder}/${file.name}`;
        await s3.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body,
          })
        );
        return { key };
      })
    );

    const ids = await db
      .insert(media)
      .values(keys)
      .returning({ insertedId: media.id });

    return ids.map((id) => id.insertedId);
  },
};

export default mediaService;
