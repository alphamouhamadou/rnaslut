import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await db.galleryItem.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, image, category, order } = body;

    if (!title || !image) {
      return NextResponse.json(
        { error: 'Titre et image sont requis.' },
        { status: 400 }
      );
    }

    const item = await db.galleryItem.create({
      data: { title, image, category: category || 'sensibilisation', order: order || 0 },
    });

    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}