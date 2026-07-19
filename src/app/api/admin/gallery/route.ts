import { getSafeSession } from '@/lib/auth-nextauth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const items = await db.galleryItem.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const { title, image, category, order, active } = body;

    if (!title || !image) {
      return NextResponse.json(
        { error: 'Titre et image sont requis.' },
        { status: 400 },
      );
    }

    const item = await db.galleryItem.create({
      data: {
        title,
        image,
        category: category || 'sensibilisation',
        order: order ?? 0,
        active: active !== false,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}