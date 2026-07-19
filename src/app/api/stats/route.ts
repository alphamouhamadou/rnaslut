import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stats = await db.siteStat.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}