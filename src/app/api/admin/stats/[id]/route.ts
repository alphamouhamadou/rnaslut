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
    const { label, value, suffix, order } = body;

    const stat = await db.siteStat.update({
      where: { id },
      data: {
        ...(label !== undefined && { label }),
        ...(value !== undefined && { value }),
        ...(suffix !== undefined && { suffix }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json(stat);
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
    await db.siteStat.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}