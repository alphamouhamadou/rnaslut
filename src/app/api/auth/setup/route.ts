import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getSafeSession } from '@/lib/auth-nextauth';
import { hashPassword } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSafeSession();
    if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const count = await db.user.count();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis.' }, { status: 400 });
    }

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé.' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const user = await db.user.create({
      data: { email, password: hashedPassword, name: name || 'Admin' },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}