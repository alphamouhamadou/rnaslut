import { getSafeSession } from '@/lib/auth-nextauth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const stats = await db.siteStat.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const { label, value, suffix, order } = body;

    if (!label || !value) {
      return NextResponse.json(
        { error: 'Label et valeur sont requis.' },
        { status: 400 },
      );
    }

    const stat = await db.siteStat.create({
      data: {
        label,
        value,
        suffix: suffix || '',
        order: order ?? 0,
      },
    });

    return NextResponse.json(stat, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}