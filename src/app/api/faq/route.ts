import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await db.faqItem.findMany({
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
    const { question, answer, order } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question et réponse sont requis.' },
        { status: 400 }
      );
    }

    const item = await db.faqItem.create({
      data: { question, answer, order: order || 0 },
    });

    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}