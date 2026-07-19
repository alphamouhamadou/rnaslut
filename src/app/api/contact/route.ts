import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Veuillez saisir une adresse email valide.' },
        { status: 400 }
      );
    }

    const contactMessage = await db.contactMessage.create({
      data: { name, email, subject: subject || '', message },
    });

    return NextResponse.json(
      { success: true, id: contactMessage.id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}