import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function clientS3Upload(media: File[], orgSlug: string) {
  const mediaReqBody = new FormData();
  mediaReqBody.append('folder', orgSlug);
  media.forEach((file) => {
    mediaReqBody.append('media', file, file.name);
  });

  const response = await fetch('/api/media', {
    method: 'POST',
    body: mediaReqBody,
  }).then((res) => res.json());

  return response;
}
