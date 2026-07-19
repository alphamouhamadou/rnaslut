import { getSafeSession } from '@/lib/auth-nextauth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const posts = await db.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSafeSession();
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, category, image, readTime, published } = body;

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Titre, slug, extrait et contenu sont requis.' },
        { status: 400 },
      );
    }

    const post = await db.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category: category || 'Événement',
        image: image || '/img/image1.jpeg',
        readTime: readTime || '3 min',
        published: published !== false,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}