import { getSafeSession } from '@/lib/auth-nextauth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const activities = await db.activity.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(activities);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const { title, description, icon, badge, image, order, active } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Titre et description sont requis.' },
        { status: 400 },
      );
    }

    const activity = await db.activity.create({
      data: {
        title,
        description,
        icon: icon || 'fas fa-bullhorn',
        badge: badge || 'Sensibilisation',
        image: image || '',
        order: order ?? 0,
        active: active !== false,
      },
    });

    return NextResponse.json(activity, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}