import { Calendar, ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
  createdAt: string;
}

interface BlogSectionProps {
  posts: BlogPost[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section id="actualites" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <RevealOnScroll className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Nos <span className="text-rn-red">Actualités</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Restez informé des dernières nouvelles et avancées dans la lutte
            contre la tuberculose au Sénégal.
          </p>
        </RevealOnScroll>

        {/* Blog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {posts.map((post) => (
            <RevealOnScroll key={post.id}>
              <article className="bg-card border border-border rounded-2xl overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Date badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.createdAt)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Meta row */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-rn-red uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2 leading-snug group-hover:text-rn-red transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read more link */}
                  <a
                    href={`#${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-rn-red hover:gap-3 transition-all duration-300"
                  >
                    Lire la suite
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}