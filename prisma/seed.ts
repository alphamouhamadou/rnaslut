import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

async function main() {
  // --- Admin User ---
  const existingAdmin = await db.user.findUnique({ where: { email: 'admin@rn-aslut.sn' } });
  if (!existingAdmin) {
    const hashedPassword = await hashPassword('Admin@2024');
    await db.user.create({
      data: {
        email: 'admin@rn-aslut.sn',
        password: hashedPassword,
        name: 'Administrateur RN-ASLUT',
        role: 'admin',
      },
    });
    console.log('Admin user created: admin@rn-aslut.sn / Admin@2024');
  } else {
    console.log('Admin user already exists.');
  }

  // --- Stats ---
  const stats = [
    { label: 'Année de création', value: '2005', suffix: '', order: 1 },
    { label: 'Membres actifs', value: '250', suffix: '', order: 2 },
    { label: 'Régions couvertes', value: '14', suffix: '', order: 3 },
    { label: 'Personnes touchées', value: '1500', suffix: '+', order: 4 },
  ];

  for (const s of stats) {
    await db.siteStat.upsert({
      where: { id: `stat-${s.order}` },
      update: s,
      create: { id: `stat-${s.order}`, ...s },
    });
  }

  // --- Blog Posts ---
  const posts = [
    {
      id: 'post-1',
      title: 'Journée mondiale de lutte contre la TB 2025',
      slug: 'journee-mondiale-tb-2025',
      excerpt: "À l'occasion de la Journée mondiale de la tuberculose, le RN-ASLUT a organisé une grande campagne de sensibilisation dans les 14 régions du Sénégal.",
      content: "À l'occasion de la Journée mondiale de la tuberculose, le RN-ASLUT a organisé une grande campagne de sensibilisation dans les 14 régions du Sénégal, avec des dépistages gratuits et des causeries éducatives dans les quartiers les plus touchés. Plus de 500 personnes ont été sensibilisées lors de cette journée, et 45 cas présumés ont été orientés vers les centres de dépistage. Cette édition a été marquée par la participation de représentants du Ministère de la Santé, du PNT et de nos partenaires internationaux dont Plan International et le Fonds Mondial. Les activités ont inclut des marches de sensibilisation, des projections de films documentaires et des témoignages d'anciens malades guéris.",
      category: 'Événement',
      image: '/img/image1.jpeg',
      readTime: '3 min',
    },
    {
      id: 'post-2',
      title: 'Nouvelle cohorte de relais communautaires formés',
      slug: 'nouvelle-cohorte-relais-comunautaires',
      excerpt: "Le RN-ASLUT, en partenariat avec le PNT et Plan International, a formé 50 nouveaux relais communautaires issus d'anciens malades de la tuberculose.",
      content: "Le RN-ASLUT, en partenariat avec le PNT et Plan International, a formé 50 nouveaux relais communautaires issus d'anciens malades de la tuberculose. Ces relais seront déployés dans les districts sanitaires de Dakar et Thiès. La formation de 5 jours a couvert les aspects de détection précoce, l'accompagnement des malades, la lutte contre la stigmatisation et les techniques de communication communautaire. Les nouveaux relais rejoignent les 200 autres membres actifs du réseau pour renforcer la riposte contre la TB au niveau communautaire. Cette initiative s'inscrit dans le cadre du plan stratégique 2024-2027 du RN-ASLUT.",
      category: 'Formation',
      image: '/img/image5.jpeg',
      readTime: '4 min',
    },
    {
      id: 'post-3',
      title: "Renforcement du partenariat avec le Fonds Mondial",
      slug: 'renforcement-partenariat-fonds-mondial',
      excerpt: "Le RN-ASLUT a participé à la réunion du CCM pour la soumission de la nouvelle note conceptuelle au Fonds Mondial de lutte contre le Sida, la Tuberculose et le Paludisme.",
      content: "Le RN-ASLUT a participé à la réunion du CCM pour la soumission de la nouvelle note conceptuelle au Fonds Mondial de lutte contre le Sida, la Tuberculose et le Paludisme. Une étape clé pour le financement 2025-2027. En tant que membre actif du CCM depuis sa création, le RN-ASLUT a plaidé pour un renforcement des financements dédiés aux activités communautaires de lutte contre la TB. La nouvelle note conceptuelle prévoit une augmentation de 30% du budget alloué aux interventions communautaires, ce qui permettra d'étendre la stratégie Vigilance-Transport aux 8 régions restantes et de former 100 relais communautaires supplémentaires.",
      category: 'Partenariat',
      image: '/img/image7.jpg',
      readTime: '2 min',
    },
  ];

  for (const p of posts) {
    await db.blogPost.upsert({
      where: { id: p.id },
      update: p,
      create: p,
    });
  }

  // --- FAQ ---
  const faqs = [
    {
      id: 'faq-1',
      question: "Qu'est-ce que la tuberculose et comment se transmet-elle ?",
      answer: "La tuberculose (TB) est une maladie infectieuse causée par la bactérie Mycobacterium tuberculosis. Elle se transmet principalement par voie aérienne lorsqu'une personne atteinte de TB pulmonaire tousse, éternue ou parle, projetant des bacilles dans l'air. Les personnes à proximité peuvent alors inhaler ces bacilles et développer l'infection. La TB touche le plus souvent les poumons, mais peut aussi atteindre d'autres organes (TB extra-pulmonaire).",
      order: 1,
    },
    {
      id: 'faq-2',
      question: 'Quels sont les symptômes de la tuberculose ?',
      answer: "Les symptômes les plus courants de la tuberculose pulmonaire incluent : une toux persistante pendant plus de deux semaines, des crachats parfois sanglants, une fièvre modérée surtout le soir, des sueurs nocturnes abondantes, une perte de poids inexpliquée, une fatigue générale et une perte d'appétit. Si vous présentez ces symptômes, il est important de consulter rapidement un centre de santé pour un dépistage gratuit au Sénégal.",
      order: 2,
    },
    {
      id: 'faq-3',
      question: 'Le traitement de la tuberculose est-il gratuit au Sénégal ?',
      answer: "Oui, le traitement de la tuberculose est entièrement gratuit au Sénégal dans toutes les structures de santé publiques. Le Programme National de Lutte contre la Tuberculose (PNT) fournit gratuitement les médicaments antituberculeux. Le traitement standard dure 6 mois pour la TB sensible et doit être suivi scrupuleusement pour éviter l'apparition de souches résistantes. Le RN-ASLUT accompagne les malades tout au long de leur parcours de soins.",
      order: 3,
    },
    {
      id: 'faq-4',
      question: 'Comment devenir membre du RN-ASLUT ?',
      answer: "Le RN-ASLUT est ouvert à toute personne souhaitant s'engager dans la lutte contre la tuberculose. Vous pouvez adhérer à l'une des 21 associations membres du réseau réparties dans les 14 régions du Sénégal. Les anciens malades, les parents de personnes affectées et les acteurs de santé communautaire sont particulièrement bienvenus. Pour rejoindre le réseau, contactez-nous via le formulaire de contact ou envoyez un email à contact@rn-aslut.sn.",
      order: 4,
    },
    {
      id: 'faq-5',
      question: "Qu'est-ce que la stratégie \u00ab Vigilance-Transport \u00bb ?",
      answer: "La stratégie Vigilance-Transport est une approche innovante initiée par le RN-ASLUT et validée par le PNT. Elle consiste à sensibiliser les usagers et les conducteurs du transport public de voyageurs (gares routières, cars interurbains) sur les symptômes de la TB. Les chauffeurs et gérants de gares sont formés pour orienter les personnes présentant des symptômes vers les centres de dépistage. Cette stratégie a déjà été déployée dans 6 régions et sera étendue aux 8 régions restantes.",
      order: 5,
    },
    {
      id: 'faq-6',
      question: 'Comment puis-je soutenir les actions du RN-ASLUT ?',
      answer: "Vous pouvez soutenir le RN-ASLUT de plusieurs manières : devenir membre bénévole du réseau, faire un don financier pour soutenir les activités de sensibilisation, proposer vos compétences (médicales, communication, logistique), ou relayer nos actions sur vos réseaux sociaux. Chaque contribution, même modeste, compte dans la lutte contre la tuberculose. Contactez-nous pour en savoir plus sur les possibilités de partenariat et de bénévolat.",
      order: 6,
    },
  ];

  for (const f of faqs) {
    await db.faqItem.upsert({
      where: { id: f.id },
      update: f,
      create: f,
    });
  }

  // --- Gallery ---
  const gallery = [
    { id: 'gal-1', title: 'Sensibilisation communautaire', image: '/img/image1.jpeg', category: 'sensibilisation', order: 1 },
    { id: 'gal-2', title: 'Formation de relais', image: '/img/image2.jpg', category: 'formation', order: 2 },
    { id: 'gal-3', title: 'Campagne de dépistage', image: '/img/image3.png', category: 'sensibilisation', order: 3 },
    { id: 'gal-4', title: 'Session de formation', image: '/img/image5.jpeg', category: 'formation', order: 4 },
    { id: 'gal-5', title: 'Action terrain', image: '/img/image6.jpeg', category: 'sensibilisation', order: 5 },
    { id: 'gal-6', title: 'Rencontre partenaires', image: '/img/image7.jpg', category: 'partenaire', order: 6 },
    { id: 'gal-7', title: 'Vigilance-Transport', image: '/img/image8.png', category: 'sensibilisation', order: 7 },
    { id: 'gal-8', title: 'Événement partenaire', image: '/img/image4.jpeg', category: 'partenaire', order: 8 },
  ];

  for (const g of gallery) {
    await db.galleryItem.upsert({
      where: { id: g.id },
      update: g,
      create: g,
    });
  }

  // --- Partners ---
  const partners = [
    { id: 'part-1', name: 'PNT Sénégal', logo: '/img/partenaire-pnt.jpg', order: 1 },
    { id: 'part-2', name: 'Plan International', logo: '/img/partenaire-plan-international.png', order: 2 },
    { id: 'part-3', name: 'Fonds Mondial', logo: '/img/partenaire-fonds-mondial.png', order: 3 },
    { id: 'part-4', name: 'CCM Sénégal', logo: '/img/partenaire-ccm-senegal.jpg', order: 4 },
    { id: 'part-5', name: 'Speak Up Africa', logo: '/img/partenaire-speak-up-africa.jpg', order: 5 },
  ];

  for (const p of partners) {
    await db.partner.upsert({
      where: { id: p.id },
      update: p,
      create: p,
    });
  }

  // --- Activities ---
  const activities = [
    {
      id: 'act-1',
      title: 'Sensibilisation & information communautaire',
      description: 'Information des populations pour lutter contre la stigmatisation et améliorer la connaissance de la maladie, dans les quartiers, marchés et lieux publics.',
      icon: 'fas fa-bullhorn',
      badge: 'Sensibilisation',
      image: '/img/image2.jpg',
      order: 1,
    },
    {
      id: 'act-2',
      title: 'Formation de relais communautaires',
      description: "Formation de relais communautaires (anciens malades et personnes affectées) avec le soutien du PNT et de nos partenaires, pour une riposte efficace sur le terrain.",
      icon: 'fas fa-chalkboard-teacher',
      badge: 'Formation',
      image: '/img/image5.jpeg',
      order: 2,
    },
    {
      id: 'act-3',
      title: 'Détection de cas & accompagnement',
      description: "Détection des cas présumés, orientation et accompagnement des malades vers les structures de dépistage et de traitement les plus proches.",
      icon: 'fas fa-search-location',
      badge: 'Détection',
      image: '/img/image6.jpeg',
      order: 3,
    },
    {
      id: 'act-4',
      title: 'Plaidoyer national & international',
      description: "Implication des communautés dans l'élaboration des stratégies et politiques nationales de riposte contre la TB, en tant que membre du CCM.",
      icon: 'fas fa-globe-africa',
      badge: 'Plaidoyer',
      image: '',
      order: 4,
    },
    {
      id: 'act-5',
      title: 'Stratégie « Vigilance-Transport »',
      description: "Sensibilisation dans le secteur du transport public de voyageurs — une stratégie validée par le Programme National de lutte contre la TB.",
      icon: 'fas fa-bus',
      badge: 'Vigilance-Transport',
      image: '',
      order: 5,
    },
    {
      id: 'act-6',
      title: 'Causeries en écoles & Daara',
      description: "Causeries dans les écoles pour les élèves et enseignants, visites auprès des Daara et éducation à la prévention de la tuberculose.",
      icon: 'fas fa-school',
      badge: 'Coordination',
      image: '',
      order: 6,
    },
  ];

  for (const a of activities) {
    await db.activity.upsert({
      where: { id: a.id },
      update: a,
      create: a,
    });
  }

  // --- Perspectives ---
  const perspectives = [
    {
      id: 'persp-1',
      title: 'Vigilance-Transport',
      description: "Élargissement de la stratégie « Vigilance-Transport » (sensibilisation dans le secteur du transport public) vers les 8 autres régions non encore concernées.",
      icon: 'fas fa-bus',
      order: 1,
    },
    {
      id: 'persp-2',
      title: 'Implication communautaire',
      description: "Plaidoyer pour l'autorisation de l'implication directe des communautaires dans le transport des crachats et la distribution des médicaments aux malades.",
      icon: 'fas fa-pills',
      order: 2,
    },
    {
      id: 'persp-3',
      title: 'Écoles & Daaras',
      description: "Intervention dans les écoles, visites auprès des Daara, causeries pour les élèves et enseignants, revue de la leçon sur la TB à l'école.",
      icon: 'fas fa-school',
      order: 3,
    },
    {
      id: 'persp-4',
      title: 'Médiatrices TB',
      description: "Enrôlement de médiatrices TB dans les structures sanitaires (centres de santé) et revalorisation du statut des acteurs communautaires.",
      icon: 'fas fa-female',
      order: 4,
    },
    {
      id: 'persp-5',
      title: 'Ambassadeurs & Partenaires',
      description: "Identification de champions comme ambassadeurs, collaboration avec tradipraticiens et pharmaciens via des fiches de contre-référence.",
      icon: 'fas fa-star',
      order: 5,
    },
    {
      id: 'persp-6',
      title: 'Visibilité & Renforcement',
      description: "Renforcement de la visibilité des interventions sur le Web et de la capacité institutionnelle et partenariale du réseau.",
      icon: 'fas fa-globe',
      order: 6,
    },
  ];

  for (const p of perspectives) {
    await db.perspective.upsert({
      where: { id: p.id },
      update: p,
      create: p,
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });