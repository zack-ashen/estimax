import mediaService from '@/services/media.service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // TODO: Fix this with try catch etc
  const formData = await request.formData();
  const folder = formData.get('folder') as string;
  const files = formData.getAll('media') as File[];

  const keys = await mediaService.uploadMany(files, folder);

  return NextResponse.json({ keys });
}
