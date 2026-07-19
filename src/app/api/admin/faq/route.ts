import { getSafeSession } from '@/lib/auth-nextauth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const items = await db.faqItem.findMany({
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
    const { question, answer, order, active } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question et réponse sont requis.' },
        { status: 400 },
      );
    }

    const item = await db.faqItem.create({
      data: {
        question,
        answer,
        order: order ?? 0,
        active: active !== false,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}