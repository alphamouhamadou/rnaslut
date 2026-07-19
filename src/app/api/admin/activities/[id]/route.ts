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
    const { title, description, icon, badge, image, order, active } = body;

    const activity = await db.activity.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(badge !== undefined && { badge }),
        ...(image !== undefined && { image }),
        ...(order !== undefined && { order }),
        ...(active !== undefined && { active }),
      },
    });

    return NextResponse.json(activity);
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
    await db.activity.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}