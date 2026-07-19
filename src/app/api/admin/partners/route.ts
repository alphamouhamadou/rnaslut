import { getSafeSession } from '@/lib/auth-nextauth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const partners = await db.partner.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(partners);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const { name, logo, url, order } = body;

    if (!name || !logo) {
      return NextResponse.json(
        { error: 'Nom et logo sont requis.' },
        { status: 400 },
      );
    }

    const partner = await db.partner.create({
      data: {
        name,
        logo,
        url: url || '',
        order: order ?? 0,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}