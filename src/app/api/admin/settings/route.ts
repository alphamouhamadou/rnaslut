import { getSafeSession } from '@/lib/auth-nextauth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const configs = await db.siteConfig.findMany();
    const kv: Record<string, string> = {};
    for (const config of configs) {
      kv[config.key] = config.value;
    }
    return NextResponse.json(kv);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const entries: { key: string; value: string }[] = body;

    if (!Array.isArray(entries) || entries.length === 0) {
      return NextResponse.json(
        { error: 'Un tableau de configurations est requis.' },
        { status: 400 },
      );
    }

    const results = await Promise.all(
      entries.map(({ key, value }) =>
        db.siteConfig.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        }),
      ),
    );

    return NextResponse.json(results);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}