import { getSafeSession } from '@/lib/auth-nextauth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const { question, answer, order, active } = body;

    const item = await db.faqItem.update({
      where: { id },
      data: {
        ...(question !== undefined && { question }),
        ...(answer !== undefined && { answer }),
        ...(order !== undefined && { order }),
        ...(active !== undefined && { active }),
      },
    });

    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { id } = await params;
    await db.faqItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}