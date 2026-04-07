
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Facebook,
  MessageCircle,
  Clock,
  Dumbbell,
  CreditCard,
  Phone,
  Calculator,
  CheckCircle2,
  Globe,
  Star,
  HelpCircle,
  ArrowRight,
  Mail,
  MapPin,
  Quote,
  Users,
  Send,
  X,
  ChevronDown,
  Zap,
  Shield,
  Target,
  Award,
  Menu,
} from 'lucide-react';

type Language = 'fr' | 'ar';
type TabType = 'home' | 'schedule' | 'subscriptions' | 'bmi' | 'gallery' | 'trainers' | 'contact';

const TAB_ORDER: TabType[] = ['home', 'schedule', 'subscriptions', 'bmi', 'gallery', 'trainers', 'contact'];

const TRANSLATIONS = {
  fr: {
    brand: "CLUB SIFAKS",
    tagline: "FORGE TON CORPS. LIBÈRE TON ESPRIT.",
    slogan: "Musculation · CrossFit · Vo Vietnam",
    nav: {
      home: "Accueil",
      schedule: "Planning",
      subscriptions: "Abonnements",
      bmi: "IMC",
      gallery: "Galerie",
      trainers: "Coachs",
      contact: "Contact"
    },
    home: {
      heroTitle: "L'EXCELLENCE\nDU COMBAT\nET DU FITNESS",
      heroSubtitle: "Rejoignez l'élite. Coaching personnalisé, arts martiaux et musculation de haut niveau — fondé par le Coach Sifaks.",
      cta: "Commencer maintenant",
      ctaSecondary: "Voir les tarifs",
      stats: { members: "1500+\nMembres", coaches: "12\nExperts", space: "800m²\nd'Espace", years: "10+\nAns d'Exp." }
    },
    disciplines: {
      title: "Nos Disciplines",
      subtitle: "Un programme complet pour chaque objectif",
      items: [
        { name: "Musculation", desc: "Équipements premium, programmes sur mesure, progression garantie.", icon: "💪" },
        { name: "CrossFit", desc: "Entraînements fonctionnels à haute intensité pour dépasser vos limites.", icon: "⚡" },
        { name: "Vo Vietnam", desc: "Art martial traditionnel vietnamien. Force, souplesse et efficacité au combat.", icon: "🥋" },
      ]
    },
    schedule: {
      title: "Planning des Cours",
      subtitle: "Des horaires adaptés à votre rythme de vie",
      day: "Jour", time: "Heure", course: "Cours", coach: "Coach"
    },
    subscriptions: {
      title: "Nos Formules",
      subtitle: "Investissez dans votre transformation",
      cta: "Choisir cette formule",
      popular: "Le plus populaire",
      features: "Ce qui est inclus"
    },
    bmi: {
      title: "Calculateur IMC",
      subtitle: "Connaissez votre point de départ",
      desc: "L'Indice de Masse Corporelle vous aide à évaluer votre santé physique et à définir vos objectifs avec votre coach.",
      weight: "Poids (kg)", height: "Taille (cm)",
      calculate: "Calculer mon IMC", result: "Votre Résultat",
      status: { low: "Insuffisance pondérale", normal: "Poids normal", over: "Surpoids", obese: "Obésité" }
    },
    gallery: {
      title: "Nos Installations",
      subtitle: "Des espaces conçus pour la performance"
    },
    trainers: {
      title: "Nos Experts",
      subtitle: "Des professionnels dédiés à votre succès",
      specialty: "Spécialité", experience: "Expérience",
      clickHint: "Cliquer pour voir le profil"
    },
    testimonials: {
      title: "Ils ont transformé leur vie",
      subtitle: "Les résultats parlent d'eux-mêmes"
    },
    faq: {
      title: "Questions Fréquentes",
      items: [
        { q: "Quels sont vos horaires d'ouverture ?", a: "Nous sommes ouverts du samedi au jeudi, de 06h00 à 22h00. Le vendredi de 08h00 à 12h00." },
        { q: "Y a-t-il du coaching personnalisé ?", a: "Oui. Tous nos coachs proposent un suivi individuel. Des bilans gratuits sont disponibles sur rendez-vous." },
        { q: "Peut-on essayer avant de s'abonner ?", a: "Absolument. Nous offrons une séance d'essai gratuite pour tous les nouveaux membres." },
        { q: "Y a-t-il un parking ?", a: "Oui, un parking sécurisé et surveillé est disponible pour tous nos membres." },
      ]
    },
    footer: {
      rights: "Tous droits réservés.",
      newsletter: "Restez informé",
      newsletterDesc: "Recevez nos offres et conseils fitness.",
      subscribe: "S'abonner",
      success: "✓ Merci ! Vous êtes inscrit."
    }
  },
  ar: {
    brand: "نادي سيفاكس",
    tagline: "اصنع جسدك. حرر عقلك.",
    slogan: "كمال الأجسام · كروس فيت · فو فيتنام",
    nav: {
      home: "الرئيسية", schedule: "الجدول", subscriptions: "الاشتراكات",
      bmi: "حساب IMC", gallery: "المعرض", trainers: "المدربون", contact: "اتصل بنا"
    },
    home: {
      heroTitle: "التميز في\nالقتال\nواللياقة",
      heroSubtitle: "انضم إلى النخبة. تدريب شخصي، فنون قتالية وكمال أجسام على أعلى مستوى — بإشراف الكوتش سيفاكس.",
      cta: "ابدأ الآن",
      ctaSecondary: "عرض الأسعار",
      stats: { members: "+1500\nعضو", coaches: "12\nخبير", space: "800م²\nمساحة", years: "+10\nسنوات خبرة" }
    },
    disciplines: {
      title: "تخصصاتنا",
      subtitle: "برنامج متكامل لكل هدف",
      items: [
        { name: "كمال الأجسام", desc: "معدات ممتازة، برامج مخصصة، تقدم مضمون.", icon: "💪" },
        { name: "كروس فيت", desc: "تمارين وظيفية عالية الكثافة لتتخطى حدودك.", icon: "⚡" },
        { name: "فو فيتنام", desc: "فن قتالي فيتنامي تقليدي. القوة والمرونة والفعالية في القتال.", icon: "🥋" },
      ]
    },
    schedule: {
      title: "جدول الحصص", subtitle: "مواعيد تناسب إيقاع حياتك",
      day: "اليوم", time: "الوقت", course: "الحصة", coach: "المدرب"
    },
    subscriptions: {
      title: "باقاتنا", subtitle: "استثمر في تحولك",
      cta: "اختر هذه الباقة", popular: "الأكثر شعبية", features: "ما يتضمنه الاشتراك"
    },
    bmi: {
      title: "حاسبة IMC", subtitle: "اعرف نقطة انطلاقك",
      desc: "مؤشر كتلة الجسم يساعدك على تقييم صحتك البدنية وتحديد أهدافك مع مدربك.",
      weight: "الوزن (كغ)", height: "الطول (سم)",
      calculate: "احسب مؤشري", result: "نتيجتك",
      status: { low: "نقص في الوزن", normal: "وزن طبيعي", over: "وزن زائد", obese: "سمنة" }
    },
    gallery: { title: "مرافقنا", subtitle: "فضاءات مصممة للأداء العالي" },
    trainers: {
      title: "خبراؤنا", subtitle: "محترفون مخصصون لنجاحك",
      specialty: "التخصص", experience: "الخبرة", clickHint: "اضغط لرؤية الملف الشخصي"
    },
    testimonials: { title: "غيّروا حياتهم", subtitle: "النتائج تتحدث عن نفسها" },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        { q: "ما هي أوقات العمل؟", a: "نحن مفتوحون من السبت إلى الخميس من 06:00 إلى 22:00. الجمعة من 08:00 إلى 12:00." },
        { q: "هل يوجد تدريب شخصي؟", a: "نعم. جميع مدربينا يقدمون متابعة فردية. تقييمات مجانية متاحة عند الطلب." },
        { q: "هل يمكن التجربة قبل الاشتراك؟", a: "بالتأكيد. نقدم حصة تجريبية مجانية لجميع الأعضاء الجدد." },
        { q: "هل يوجد موقف سيارات؟", a: "نعم، موقف سيارات آمن ومراقب متاح لجميع أعضائنا." },
      ]
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      newsletter: "ابق على اطلاع",
      newsletterDesc: "احصل على عروضنا ونصائح اللياقة.",
      subscribe: "اشتراك",
      success: "✓ شكراً! تم تسجيلك."
    }
  }
};

const SCHEDULE_DATA = [
  { day: { fr: 'Lundi', ar: 'الإثنين' }, time: '08:00–10:00', course: { fr: 'Taekwondo Kids', ar: 'تايكوندو للأطفال' }, trainer: 'Omar', type: 'martial' },
  { day: { fr: 'Lundi', ar: 'الإثنين' }, time: '18:00–20:00', course: { fr: 'Vo Vietnam', ar: 'فو فيتنام' }, trainer: 'Karim', type: 'martial' },
  { day: { fr: 'Mardi', ar: 'الثلاثاء' }, time: '07:00–09:00', course: { fr: 'CrossFit Matinal', ar: 'كروس فيت صباحي' }, trainer: 'Amine', type: 'crossfit' },
  { day: { fr: 'Mardi', ar: 'الثلاثاء' }, time: '10:00–12:00', course: { fr: 'Vo Vietnam', ar: 'فو فيتنام' }, trainer: 'Amine', type: 'martial' },
  { day: { fr: 'Mercredi', ar: 'الأربعاء' }, time: '17:00–19:00', course: { fr: 'Taekwondo Adultes', ar: 'تايكوندو للكبار' }, trainer: 'Omar', type: 'martial' },
  { day: { fr: 'Jeudi', ar: 'الخميس' }, time: '07:00–09:00', course: { fr: 'CrossFit Compétition', ar: 'كروس فيت تنافسي' }, trainer: 'Sifaks', type: 'crossfit' },
  { day: { fr: 'Jeudi', ar: 'الخميس' }, time: '18:00–20:00', course: { fr: 'Vo Vietnam Combat', ar: 'فو فيتنام قتالي' }, trainer: 'Karim', type: 'martial' },
  { day: { fr: 'Vendredi', ar: 'الجمعة' }, time: '09:00–11:00', course: { fr: 'Vo Vietnam & Méditation', ar: 'فو فيتنام وتأمل' }, trainer: 'Amine', type: 'martial' },
];

const SUBSCRIPTIONS = [
  {
    duration: { fr: '1 Mois', ar: 'شهر واحد' },
    price: '3 000 DA', priceNote: { fr: '/mois', ar: '/شهر' },
    features: {
      fr: ['Accès illimité salle', 'Vestiaire & douches', '1 Séance coachée'],
      ar: ['دخول غير محدود', 'غرفة تبديل ودشات', 'حصة تدريبية واحدة']
    },
    highlight: false
  },
  {
    duration: { fr: '2 Mois', ar: 'شهرين' },
    price: '5 000 DA', priceNote: { fr: '/2 mois', ar: '/شهرين' },
    features: {
      fr: ['Accès illimité salle', 'Vestiaire & douches', '2 Séances coachées', 'Plan nutritionnel offert'],
      ar: ['دخول غير محدود', 'غرفة تبديل ودشات', 'حصتان تدريبيتان', 'خطة غذائية مجانية']
    },
    highlight: false
  },
  {
    duration: { fr: '6 Mois', ar: '6 أشهر' },
    price: '10 000 DA', priceNote: { fr: '/6 mois', ar: '/6 أشهر' },
    features: {
      fr: ['Accès illimité salle', 'Vestiaire & douches', 'Accès VIP', 'Suivi mensuel coach', 'Plan nutritionnel'],
      ar: ['دخول غير محدود', 'غرفة تبديل ودشات', 'دخول VIP', 'متابعة شهرية', 'خطة غذائية']
    },
    highlight: true
  },
  {
    duration: { fr: '12 Mois', ar: '12 شهر' },
    price: '20 000 DA', priceNote: { fr: '/an', ar: '/سنة' },
    features: {
      fr: ['Accès illimité salle', 'Vestiaire & douches', 'Accès VIP', 'Suivi hebdomadaire', 'Plan nutritionnel', 'T-shirt Club offert'],
      ar: ['دخول غير محدود', 'غرفة تبديل ودشات', 'دخول VIP', 'متابعة أسبوعية', 'خطة غذائية', 'قميص النادي هدية']
    },
    highlight: false
  },
];

const TRAINERS = [
  {
    name: 'Coach Sifaks',
    specialty: { fr: 'Arts Martiaux & Fitness', ar: 'فنون قتالية ولياقة' },
    exp: '15',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e6349?q=80&w=600&auto=format&fit=crop',
    bio: { fr: "Fondateur du club et expert en arts martiaux mixtes. Coach Sifaks combine la discipline du combat avec la science moderne du fitness pour des résultats exceptionnels.", ar: "مؤسس النادي وخبير في الفنون القتالية المختلطة. يجمع الكوتش سيفاكس بين انضباط القتال وعلم اللياقة الحديث لتحقيق نتائج استثنائية." }
  },
  {
    name: 'Karim Benali',
    specialty: { fr: 'Vo Vietnam & Force', ar: 'فو فيتنام والقوة' },
    exp: '8',
    image: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?q=80&w=600&auto=format&fit=crop',
    bio: { fr: "Expert en Vo Vietnam et spécialiste en préparation physique. Karim vous apprendra l'art du combat traditionnel vietnamien, alliant puissance et précision.", ar: "خبير في فو فيتنام ومتخصص في الإعداد البدني. سيعلمك كريم فن القتال الفيتنامي التقليدي، الذي يجمع بين القوة والدقة." }
  },
  {
    name: 'Omar Ziani',
    specialty: { fr: 'Taekwondo & Cardio', ar: 'تايكوندو وكارديو' },
    exp: '5',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop',
    bio: { fr: "Ancien compétiteur national de Taekwondo, Omar apporte agilité, explosivité et rigueur à vos entraînements cardio et de frappe.", ar: "متنافس سابق على المستوى الوطني في التايكوندو، يضفي عمر الرشاقة والانفجارية والصرامة على تدريبات الكارديو والضربات." }
  },
  {
    name: 'Amine Djebbar',
    specialty: { fr: 'Vo Vietnam & CrossFit', ar: 'فو فيتنام وكروس فيت' },
    exp: '6',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop',
    bio: { fr: "Maître de Vo Vietnam spécialisé dans l'entraînement fonctionnel. Amine forge le corps et l'esprit à travers le mouvement, la force et la discipline traditionnelle.", ar: "ماستر في فو فيتنام متخصص في التدريب الوظيفي. يصقل أمين الجسم والعقل من خلال الحركة والقوة والانضباط التقليدي." }
  },
];

// ── Galerie : uniquement les 3 vraies vidéos du club ──
// Les fichiers sont servis depuis public/videos/ par Express/Vite
const GALLERY_ITEMS = [
  {
    type: 'video',
    src: '/videos/video3.mp4',
    label: { fr: 'Musculation & Force', ar: 'كمال الأجسام والقوة' },
    sub:  { fr: 'Progression garantie, équipements premium', ar: 'تقدم مضمون ومعدات ممتازة' },
    tag:  { fr: 'Musculation', ar: 'كمال الأجسام' },
    featured: true,
  },
  {
    type: 'video',
    src: '/videos/video2.mp4',
    label: { fr: 'CrossFit Intensité', ar: 'كثافة كروس فيت' },
    sub:  { fr: 'Entraînement fonctionnel haute intensité', ar: 'تدريب وظيفي عالي الكثافة' },
    tag:  { fr: 'CrossFit', ar: 'كروس فيت' },
    featured: false,
  },
  {
    type: 'video',
    src: '/videos/video1.mp4',
    label: { fr: 'L\'Esprit du Combat', ar: 'روح القتال' },
    sub:  { fr: 'Arts Martiaux & Jujitsu', ar: 'فنون قتالية وجوجيتسو' },
    tag:  { fr: 'Featured', ar: 'مميز' },
    featured: false,
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    label: { fr: 'Equipements Premium', ar: 'معدات ممتازة' },
    sub:  { fr: 'Performance et sécurité', ar: 'الأداء والمارة' },
    tag:  { fr: 'Cardio', ar: 'كارديو' },
    featured: false,
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=1200&auto=format&fit=crop',
    label: { fr: 'Zone Poids Libres', ar: 'منطقة الأوزان الحرة' },
    sub:  { fr: 'Espace optimisé', ar: 'مساحة محسنة' },
    tag:  { fr: 'Force', ar: 'القوة' },
    featured: false,
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop',
    label: { fr: 'Espace Entraînement', ar: 'مساحة التدريب' },
    sub:  { fr: 'Design moderne', ar: 'تصميم عصري' },
    tag:  { fr: 'Gym', ar: 'القاعة' },
    featured: false,
  },
];

const TESTIMONIALS = [
  { 
    name: 'Kamel Mahfoudi', 
    result: 'Expertise', 
    months: 12, 
    text: { 
      fr: "Salle de sport bien située avec une variété d'équipements pour le cardio ou la musculation. Le stationnement est facile et la salle avec ses 2 niveaux, permet aux adhérents d'avoir suffisamment d'espace pour travailler à l'aise.", 
      ar: "قاعة رياضة بموقع ممتاز مع مجموعة متنوعة من المعدات للكارديو أو كمال الأجسام. ركن السيارات سهل والقاعة بمستوييها تتيح للمشتركين مساحة كافية للعمل براحة." 
    }, 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop&face' 
  },
  { 
    name: 'Zahouani Mouldi', 
    result: 'Famille', 
    months: 24, 
    text: { 
      fr: "Je m’entraîne dans cette salle depuis un moment, et franchement c’est l’un des meilleurs choix que j’ai faits. L’ambiance est motivante, les équipements sont propres et bien entretenus, et les coachs sont toujours disponibles pour guider et corriger. Avec le temps, cette salle est vraiment devenue comme une deuxième famille pour moi.", 
      ar: "أتدرب في هذه القاعة منذ فترة، وبصراحة هذا أحد أفضل القرارات التي اتخذتها. الأجواء محفزة، المعدات نظيفة وصيانتها جيدة، والمدربون متاحون دائماً للتوجيه والتصحيح. مع الوقت، أصبحت هذه القاعة حقاً كعائلة ثانية بالنسبة لي." 
    }, 
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop&face' 
  },
  { 
    name: 'Naima Khodja', 
    result: 'Propreté', 
    months: 6, 
    text: { 
      fr: "Accueil chaleureux ❤️ propre et professionnel", 
      ar: "استقبال حار ❤️ نظافة واحترافية" 
    }, 
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100&auto=format&fit=crop&face' 
  },
];

// ── Composant texte effet machine à écrire ──
function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}

// ── Composant carte vidéo premium ──
// Lecture auto au hover, pause au départ du curseur
// Affiche les métadonnées au hover avec transition fluide
interface VideoCardProps {
  key?: string | number;
  src: string;
  label: { fr: string; ar: string };
  sub: { fr: string; ar: string };
  tag: { fr: string; ar: string };
  lang: Language;
  featured?: boolean;
  index?: number;
}

function MediaCard({
  type, src, label, sub, tag, lang, featured = false, index = 0
}: VideoCardProps & { type: 'video' | 'image' }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleMouseEnter = () => {
    if (type === 'video') {
      videoRef.current?.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      setPlaying(true);
    }
  };
  const handleMouseLeave = () => {
    if (type === 'video' && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      setPlaying(false);
    }
  };
  const handleTap = () => {
    if (type === 'image') return;
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause(); setPlaying(false);
    } else {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
      className={`relative overflow-hidden border border-white/8 group cursor-pointer bg-[#080808]
        aspect-video
      `}
      style={{ boxShadow: (playing && type === 'video') ? '0 0 0 1px rgba(220,38,38,0.4)' : undefined }}
    >
      {!loaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {type === 'video' ? (
        <video
          ref={videoRef}
          src={src}
          loop
          playsInline
          muted
          preload="metadata"
          onLoadedMetadata={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
            ${playing ? 'scale-100' : 'scale-102'}
            ${loaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      ) : (
        <img
          src={src}
          alt={label[lang]}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
            ${playing ? 'scale-110' : 'scale-100'}
            ${loaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
      <div className={`absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-500 ${playing ? 'opacity-0' : 'opacity-100'}`} />

      <div className={`absolute top-4 left-4 z-10 transition-all duration-300 ${playing ? 'opacity-0 -translate-y-1' : 'opacity-100'}`}>
        <span className="bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1">
          {tag[lang]}
        </span>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <span className="font-display text-white/10 text-3xl">0{index + 1}</span>
      </div>

      {type === 'video' && (
        <div className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-300 pointer-events-none
          ${playing ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
          <div className="w-14 h-14 rounded-full border-2 border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-white ml-1" />
          </div>
        </div>
      )}

      <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-red-600 origin-top transition-transform duration-500 ${(playing && type === 'video') ? 'scale-y-100' : 'scale-y-0'}`} />

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
        <div className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1.5">{sub[lang]}</div>
        <h3 className={`font-display uppercase leading-none text-white ${featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
          {label[lang]}
        </h3>
        <div className={`flex items-center gap-2 mt-3 transition-all duration-300 ${playing ? 'opacity-100' : 'opacity-0 translate-y-1 group-hover:opacity-60 group-hover:translate-y-0'}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">
            {type === 'video' ? (lang === 'fr' ? 'En lecture' : 'قيد التشغيل') : (lang === 'fr' ? 'Voir' : 'عرض')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function calculateBMIStatus(bmi: number, lang: Language) {
  const t = TRANSLATIONS[lang].bmi.status;
  if (bmi < 18.5) return { status: t.low, color: '#60a5fa' };
  if (bmi < 25) return { status: t.normal, color: '#34d399' };
  if (bmi < 30) return { status: t.over, color: '#fbbf24' };
  return { status: t.obese, color: '#f87171' };
}

// ── CLUB SIFAKS - Site Officiel ──
// Dernière mise à jour : 2026-04-06
export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [prevTab, setPrevTab] = useState<TabType>('home');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<{ value: number; status: string; color: string } | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const subscriptionsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const trainersRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    // Navigation précise vers les sections demandées
    setTimeout(() => {
      const refs: Record<string, React.RefObject<HTMLDivElement | HTMLElement | null>> = {
        home: heroRef,
        schedule: scheduleRef,
        subscriptions: subscriptionsRef,
        gallery: galleryRef,
        trainers: trainersRef
      };
      
      const targetRef = refs[tab];
      if (targetRef?.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: tab === 'home' ? 'start' : 'center' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const direction = TAB_ORDER.indexOf(activeTab) > TAB_ORDER.indexOf(prevTab) ? 1 : -1;

  const handleCalcBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h || h <= 0) return;
    const bmi = w / (h * h);
    const { status, color } = calculateBMIStatus(bmi, lang);
    setBmiResult({ value: Math.round(bmi * 10) / 10, status, color });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSuccess(true);
  };

  const disciplineIcons = [Dumbbell, Zap, Shield, Target];
  const typeColors: Record<string, string> = {
    martial: 'bg-red-900/40 text-red-300 border-red-800/40',
    crossfit: 'bg-orange-900/40 text-orange-300 border-orange-800/40',
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ── FIXED NAV ── */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between max-w-7xl">
          <button onClick={() => handleTabChange('home')} className="flex flex-col leading-none">
            <span className="font-display text-2xl tracking-widest text-white">{lang === 'fr' ? 'CLUB' : 'نادي'}</span>
            <span className="font-display text-2xl tracking-widest text-red-500">{lang === 'fr' ? 'SIFAKS' : 'سيفاكس'}</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {(Object.keys(t.nav) as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-200 ${activeTab === tab ? 'text-red-500' : 'text-white/50 hover:text-white'}`}
              >
                {t.nav[tab]}
                {activeTab === tab && <div className="h-px bg-red-500 mt-1 w-full" />}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="hidden sm:flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'fr' ? 'عربي' : 'FR'}
            </button>
            <button
              onClick={() => handleTabChange('subscriptions')}
              className="hidden sm:block px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-widest transition-colors"
            >
              {lang === 'fr' ? "S'abonner" : 'اشترك'}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-1">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-black/98 border-t border-white/5 overflow-hidden"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {(Object.keys(t.nav) as TabType[]).map((tab) => (
                  <button key={tab} onClick={() => handleTabChange(tab)}
                    className={`text-left text-sm font-bold tracking-widest uppercase py-2 border-b border-white/5 ${activeTab === tab ? 'text-red-500' : 'text-white/60'}`}>
                    {t.nav[tab]}
                  </button>
                ))}
                <div className="flex gap-4 pt-2">
                  <button onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                    className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest">
                    <Globe className="w-4 h-4" />{lang === 'fr' ? 'العربية' : 'Français'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO (home only) ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.section
            key="hero"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            ref={heroRef}
            className="relative min-h-[100svh] flex items-end pb-20 overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center scale-105"
              >
                <source src="https://cdn.coverr.co/videos/watermark/coverr-a-man-working-out-in-a-gym-5192/1080p.mp4" type="video/mp4" />
                <img
                  src="https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=2000&auto=format&fit=crop"
                  alt="Hero Fallback"
                  className="w-full h-full object-cover object-center"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
            </div>

            {/* Big ghost text */}
            <div className={`absolute bottom-0 ${isRtl ? 'right-0' : 'left-0'} w-full pointer-events-none select-none`}>
              <div className="font-display text-[22vw] leading-none tracking-tighter opacity-[0.04] text-white whitespace-nowrap">
                SIFAKS
              </div>
            </div>

            <div className="relative z-10 container mx-auto px-6 max-w-7xl">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <div className="h-px w-12 bg-red-500" />
                  <span className="text-red-500 text-xs font-black tracking-[0.4em] uppercase">{t.slogan}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9 }}
                  className="font-display text-5xl md:text-8xl lg:text-[7rem] leading-[0.88] tracking-tight uppercase mb-8"
                >
                  {t.home.heroTitle.split('\n').map((line, i) => (
                    <div key={i} className={i === 1 ? 'text-red-500' : ''}>{line}</div>
                  ))}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}
                  className="text-white/60 text-lg max-w-xl leading-relaxed mb-10"
                >
                  {t.home.heroSubtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                  className="flex flex-wrap gap-4 mb-16"
                >
                  <button onClick={() => handleTabChange('subscriptions')}
                    className="group flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-widest transition-all duration-300">
                    {t.home.cta}
                    <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                  <button onClick={() => handleTabChange('gallery')}
                    className="px-8 py-4 border border-white/20 hover:border-white/50 text-white font-black text-sm uppercase tracking-widest transition-all duration-300">
                    {t.home.ctaSecondary}
                  </button>
                </motion.div>

                {/* Stats bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-xl"
                >
                  {Object.values(t.home.stats).map((stat, i) => {
                    const [num, label] = (stat as string).split('\n');
                    return (
                      <div key={i} className="border-l-2 border-red-600 pl-3">
                        <div className="font-display text-2xl md:text-3xl text-white leading-none">{num}</div>
                        <div className="text-white/40 text-[10px] font-bold uppercase tracking-wider mt-1">{label}</div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
              className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30"
            >
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── DISCIPLINES STRIP (home only) ── */}
      <AnimatePresence>
        {activeTab === 'home' && (
          <motion.section
            key="disciplines"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-[#0d0d0d] border-t border-white/5 py-24"
          >
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="text-center mb-16">
                <span className="text-red-500 text-xs font-black tracking-[0.4em] uppercase">{t.disciplines.subtitle}</span>
                <h2 className="font-display text-5xl md:text-6xl uppercase mt-3">{t.disciplines.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
                {t.disciplines.items.map((disc, i) => {
                  const Icon = disciplineIcons[i];
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ backgroundColor: 'rgba(220,38,38,0.08)' }}
                      className="bg-[#0d0d0d] p-10 group cursor-default transition-colors duration-500"
                    >
                      <div className="text-4xl mb-6">{disc.icon}</div>
                      <h3 className="font-display text-3xl uppercase text-white mb-3 group-hover:text-red-400 transition-colors">{disc.name}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{disc.desc}</p>
                      <div className="mt-8 h-px w-12 bg-red-600 group-hover:w-full transition-all duration-500" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── TESTIMONIALS (home only) ── */}
      <AnimatePresence>
        {activeTab === 'home' && (
          <motion.section
            key="testimonials"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="py-24 bg-black"
          >
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="text-center mb-16">
                <span className="text-red-500 text-xs font-black tracking-[0.4em] uppercase">{t.testimonials.subtitle}</span>
                <h2 className="font-display text-5xl md:text-6xl uppercase mt-3">{t.testimonials.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                    className="border border-white/8 p-8 group hover:border-red-900/50 transition-colors duration-500"
                  >
                    <div className="flex gap-1 mb-5">
                      {Array(5).fill(0).map((_, s) => <Star key={s} className="w-3.5 h-3.5 fill-red-500 text-red-500" />)}
                    </div>
                    <p className="text-white/70 italic leading-relaxed mb-8 text-sm">{item.text[lang]}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                        <div>
                          <div className="font-bold text-sm">{item.name}</div>
                          <div className="text-white/30 text-xs">{item.months} {lang === 'fr' ? 'mois' : 'أشهر'}</div>
                        </div>
                      </div>
                      <div className="text-red-500 font-black text-lg font-display">{item.result}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT (non-home tabs) ── */}
      <div id="main-content">
        <AnimatePresence mode="wait">
          {activeTab !== 'home' && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="min-h-screen pt-28 pb-24"
            >
              <div className="container mx-auto px-6 max-w-7xl">

                {/* Page header */}
                <div className={`mb-16 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-8 bg-red-500" />
                    <span className="text-red-500 text-xs font-black tracking-[0.3em] uppercase">Club Sifaks</span>
                  </div>
                  <h2 className="font-display text-5xl md:text-7xl uppercase">
                    {t.nav[activeTab]}
                  </h2>
                  {(t as any)[activeTab]?.subtitle && (
                    <p className="text-white/40 mt-3 text-sm font-medium tracking-widest uppercase">
                      {(t as any)[activeTab].subtitle}
                    </p>
                  )}
                </div>

                {/* ── SCHEDULE ── */}
                {activeTab === 'schedule' && (
                  <div ref={scheduleRef} className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          {[t.schedule.day, t.schedule.time, t.schedule.course, t.schedule.coach].map((h) => (
                            <th key={h} className={`py-4 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-red-500 ${isRtl ? 'text-right' : 'text-left'}`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {SCHEDULE_DATA.map((item, i) => (
                          <motion.tr
                            key={i}
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                            className="border-b border-white/5 hover:bg-white/3 transition-colors group"
                          >
                            <td className="py-5 px-5 font-bold text-white/80">{item.day[lang]}</td>
                            <td className="py-5 px-5 font-mono text-sm text-white/50">{item.time}</td>
                            <td className="py-5 px-5">
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-lg group-hover:text-red-400 transition-colors">{item.course[lang]}</span>
                                <span className={`text-[10px] font-black px-2 py-0.5 border uppercase tracking-wider ${typeColors[item.type]}`}>
                                  {item.type === 'martial' ? (lang === 'fr' ? 'Martial' : 'قتالي') : 'CrossFit'}
                                </span>
                              </div>
                            </td>
                            <td className="py-5 px-5 text-white/40 text-sm italic">{item.trainer}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-8 flex items-center gap-3 text-white/30 text-sm">
                      <Clock className="w-4 h-4 text-red-500" />
                      {lang === 'fr' ? 'Ouvert Sam–Jeu 06h00–22h00' : 'مفتوح السبت–الخميس 06:00–22:00'}
                    </div>
                  </div>
                )}

                {/* ── SUBSCRIPTIONS ── */}
                {activeTab === 'subscriptions' && (
                  <div ref={subscriptionsRef} id="subscriptions-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {SUBSCRIPTIONS.map((plan, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className={`relative flex flex-col p-8 border transition-all duration-300 hover:-translate-y-2 ${plan.highlight ? 'border-red-500 bg-red-950/20' : 'border-white/8 hover:border-white/20'}`}
                      >
                        {plan.highlight && (
                          <div className={`absolute -top-px ${isRtl ? 'right-0 left-0' : 'left-0 right-0'} h-0.5 bg-red-500`} />
                        )}
                        {plan.highlight && (
                          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                            <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1">
                              {t.subscriptions.popular}
                            </span>
                          </div>
                        )}

                        <div className={`text-xs font-black uppercase tracking-widest mb-6 ${plan.highlight ? 'text-red-400' : 'text-white/40'}`}>
                          {plan.duration[lang]}
                        </div>

                        <div className="mb-8">
                          <div className={`font-display text-4xl whitespace-nowrap ${plan.highlight ? 'text-red-400' : 'text-white'}`}>
                            {plan.price}
                          </div>
                          <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-2">{plan.priceNote[lang]}</div>
                        </div>

                        <div className="text-[10px] font-black tracking-widest uppercase text-white/30 mb-5">
                          {t.subscriptions.features}
                        </div>
                        <ul className="space-y-3 flex-grow mb-8">
                          {plan.features[lang].map((f, fi) => (
                            <li key={fi} className="flex items-start gap-2.5 text-sm text-white/60">
                              <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => handleTabChange('contact')}
                          className={`w-full py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-300 ${plan.highlight ? 'bg-red-600 hover:bg-red-500 text-white' : 'border border-white/20 hover:border-red-500 hover:text-red-400 text-white/60'}`}>
                          {t.subscriptions.cta}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ── BMI ── */}
                {activeTab === 'bmi' && (
                  <div className="max-w-lg mx-auto">
                    <p className="text-white/50 mb-10 leading-relaxed">{t.bmi.desc}</p>
                    <div className="space-y-5">
                      <div>
                        <label className={`block text-[10px] font-black tracking-[0.3em] uppercase text-white/30 mb-3 ${isRtl ? 'text-right' : ''}`}>{t.bmi.weight}</label>
                        <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
                          placeholder="Ex: 75"
                          className={`w-full bg-white/3 border border-white/10 focus:border-red-500 outline-none px-6 py-5 text-white text-2xl font-display transition-colors ${isRtl ? 'text-right' : ''}`} />
                      </div>
                      <div>
                        <label className={`block text-[10px] font-black tracking-[0.3em] uppercase text-white/30 mb-3 ${isRtl ? 'text-right' : ''}`}>{t.bmi.height}</label>
                        <input type="number" value={height} onChange={e => setHeight(e.target.value)}
                          placeholder="Ex: 180"
                          className={`w-full bg-white/3 border border-white/10 focus:border-red-500 outline-none px-6 py-5 text-white text-2xl font-display transition-colors ${isRtl ? 'text-right' : ''}`} />
                      </div>
                      <button onClick={handleCalcBMI}
                        className="w-full py-5 bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-widest transition-colors">
                        {t.bmi.calculate}
                      </button>
                    </div>

                    <AnimatePresence>
                      {bmiResult && (
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                          className="mt-8 border border-white/10 p-8 text-center"
                        >
                          <div className="text-[10px] font-black tracking-[0.3em] uppercase text-white/30 mb-4">{t.bmi.result}</div>
                          <div className="font-display text-6xl md:text-8xl mb-2" style={{ color: bmiResult.color }}>{bmiResult.value}</div>
                          <div className="text-lg font-bold" style={{ color: bmiResult.color }}>{bmiResult.status}</div>
                          <div className="mt-6 pt-6 border-t border-white/10 text-white/30 text-sm">
                            {lang === 'fr'
                              ? 'Parlez à votre coach pour un programme adapté à vos résultats.'
                              : 'تحدث مع مدربك للحصول على برنامج يناسب نتائجك.'}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* ── GALLERY ── */}
                {activeTab === 'gallery' && (
                  <div ref={galleryRef} className="space-y-6">

                    {/* En-tête galerie */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-px w-8 bg-red-500" />
                        <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">
                          {lang === 'fr' ? 'Contenu Exclusif Club Sifaks' : 'محتوى حصري نادي سيفاكس'}
                        </span>
                      </div>
                      <span className="text-white/15 text-[10px] font-black uppercase tracking-widest">
                        {lang === 'fr' ? `${GALLERY_ITEMS.length} éléments` : `${GALLERY_ITEMS.length} عناصر`}
                      </span>
                    </div>

                    {/* ── VIDÉO FEATURED (video3 — Musculation) ── */}
                    <div className="max-w-4xl mx-auto w-full">
                      <MediaCard
                        type={GALLERY_ITEMS[0].type as any}
                        src={GALLERY_ITEMS[0].src}
                        label={GALLERY_ITEMS[0].label}
                        sub={GALLERY_ITEMS[0].sub}
                        tag={GALLERY_ITEMS[0].tag}
                        lang={lang}
                        featured={true}
                        index={0}
                      />
                      <div className={`mt-3 flex items-center justify-center gap-2 text-white/20 text-[10px] font-bold uppercase tracking-widest ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span className="w-4 h-px bg-red-600 inline-block" />
                        {lang === 'fr' ? 'Survoler pour interagir · Cliquer sur mobile' : 'مرر للتفاعل · انقر على الجوال'}
                      </div>
                    </div>

                    {/* Séparateur */}
                    <div className="flex items-center gap-3 py-2">
                      <div className="h-px flex-1 bg-white/5" />
                      <span className="text-white/10 text-[10px] font-black uppercase tracking-[0.4em]">
                        {lang === 'fr' ? 'Médias & Séances' : 'وسائط وحصص'}
                      </span>
                      <div className="h-px flex-1 bg-white/5" />
                    </div>

                    {/* ── GRILLE MÉDIAS (Reste de la galerie) ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {GALLERY_ITEMS.slice(1).map((item, i) => (
                        <MediaCard
                          key={item.src}
                          type={item.type as any}
                          src={item.src}
                          label={item.label}
                          sub={item.sub}
                          tag={item.tag}
                          lang={lang}
                          featured={false}
                          index={i + 1}
                        />
                      ))}
                    </div>

                    {/* Footer galerie */}
                    <div className="text-center pt-6 border-t border-white/5">
                      <div className="inline-flex items-center gap-3 text-white/15 text-[10px] font-black uppercase tracking-[0.4em]">
                        <span className="w-6 h-px bg-white/10 inline-block" />
                        {lang === 'fr' ? 'Club Sifaks — Excellence & Performance' : 'نادي سيفاكس — التميز والأداء'}
                        <span className="w-6 h-px bg-white/10 inline-block" />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── TRAINERS ── */}
                {activeTab === 'trainers' && (
                  <div ref={trainersRef} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {TRAINERS.map((trainer, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedTrainer(i)}
                        className="group cursor-pointer"
                      >
                        <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '3/4' }}>
                          <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                          <div className="absolute inset-0 border border-transparent group-hover:border-red-500/30 transition-colors" />
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <div className="text-red-400 text-[10px] font-black uppercase tracking-widest mb-1">{trainer.specialty[lang]}</div>
                            <div className="font-display text-2xl uppercase">{trainer.name}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-white/30 font-bold uppercase tracking-widest">
                          <span>{trainer.exp} {lang === 'fr' ? "ans d'exp." : 'سنة خبرة'}</span>
                          <span className="text-red-500 group-hover:underline">{t.trainers.clickHint}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ── CONTACT ── */}
                {activeTab === 'contact' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                      <div className="space-y-6 mb-10">
                        {[
                          { icon: MapPin, label: 'Adresse', value: 'Alger, Algérie' },
                          { icon: Phone, label: 'Téléphone', value: '0560 05 78 48' },
                          { icon: Mail, label: 'Email', value: 'clubsifaks@yahoo.fr' },
                          { icon: Clock, label: lang === 'fr' ? 'Horaires' : 'المواعيد', value: lang === 'fr' ? 'Sam–Jeu : 06h–22h' : 'السبت–الخميس: 06:00–22:00' },
                        ].map(({ icon: Icon, label, value }, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                            className="flex items-center gap-5 group"
                          >
                            <div className="w-12 h-12 border border-white/10 group-hover:border-red-500/40 flex items-center justify-center transition-colors shrink-0">
                              <Icon className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                              <div className="text-[10px] text-white/30 font-black uppercase tracking-widest">{label}</div>
                              <div className="text-white font-medium mt-0.5">{value}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/ClubSifaks', color: 'hover:border-blue-500/50 hover:text-blue-400' },
                          { icon: MessageCircle, label: 'Instagram', href: 'https://www.instagram.com/clubsifaks/', color: 'hover:border-pink-500/50 hover:text-pink-400' },
                          { icon: Zap, label: 'TikTok', href: 'https://www.tiktok.com/@coachsifaks?_r=1&_t=ZS-95JK635jTyH', color: 'hover:border-white/50 hover:text-white' },
                          { icon: Phone, label: 'Appeler', href: 'tel:0560057848', color: 'hover:border-red-500/50 hover:text-red-400' },
                        ].map(({ icon: Icon, label, href, color }, i) => (
                          <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                            className={`flex items-center gap-3 p-4 border border-white/8 text-white/40 font-bold text-xs uppercase tracking-widest transition-all duration-300 ${color}`}>
                            <Icon className="w-4 h-4" />
                            {label}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* FAQ */}
                    <div>
                      <div className="text-[10px] text-red-500 font-black tracking-[0.3em] uppercase mb-6">{t.faq.title}</div>
                      <div className="space-y-0">
                        {t.faq.items.map((item, i) => (
                          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}>
                            <button
                              onClick={() => setOpenFaq(openFaq === i ? null : i)}
                              className="w-full flex items-center justify-between gap-4 py-5 border-b border-white/8 text-left group"
                            >
                              <span className={`font-bold text-sm group-hover:text-red-400 transition-colors ${isRtl ? 'text-right' : ''}`}>{item.q}</span>
                              <ChevronDown className={`w-4 h-4 text-white/30 shrink-0 transition-transform ${openFaq === i ? 'rotate-180 text-red-500' : ''}`} />
                            </button>
                            <AnimatePresence>
                              {openFaq === i && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <p className={`py-4 text-white/50 text-sm leading-relaxed border-b border-white/5 ${isRtl ? 'text-right' : ''}`}>{item.a}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 bg-[#080808] py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="font-display text-3xl uppercase mb-1">
                {lang === 'fr' ? 'CLUB' : 'نادي'}
              </div>
              <div className="font-display text-3xl text-red-500 uppercase mb-4">
                {lang === 'fr' ? 'SIFAKS' : 'سيفاكس'}
              </div>
              <p className="text-white/30 text-sm leading-relaxed max-w-xs">{t.home.heroSubtitle}</p>
            </div>

            <div>
              <div className="text-[10px] text-red-500 font-black tracking-[0.3em] uppercase mb-6">{t.footer.newsletter}</div>
              <p className="text-white/30 text-sm mb-4">{t.footer.newsletterDesc}</p>
              <AnimatePresence mode="wait">
                {newsletterSuccess ? (
                  <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-green-400 font-bold text-sm">{t.footer.success}</motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleNewsletterSubmit} className="flex gap-0">
                    <input type="email" required value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
                      placeholder="Email" className="flex-1 bg-white/5 border border-white/10 focus:border-red-500 outline-none px-4 py-3 text-sm text-white" />
                    <button type="submit" className="bg-red-600 hover:bg-red-500 px-4 py-3 transition-colors">
                      <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div>
              <div className="text-[10px] text-red-500 font-black tracking-[0.3em] uppercase mb-6">{t.nav.contact}</div>
              <div className="space-y-4">
                <div className="space-y-2 text-white/30 text-sm">
                  <p>Alger, Algérie</p>
                  <p>0560 05 78 48</p>
                  <p>clubsifaks@yahoo.fr</p>
                </div>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/ClubSifaks" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-blue-500 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/clubsifaks/" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-pink-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                  <a href="https://www.tiktok.com/@coachsifaks?_r=1&_t=ZS-95JK635jTyH" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors">
                    <Zap className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-white/15 text-[10px] uppercase tracking-[0.3em]">
            © 2026 {t.brand}. {t.footer.rights}
          </div>
        </div>
      </footer>

      {/* ── TRAINER MODAL ── */}
      <AnimatePresence>
        {selectedTrainer !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedTrainer(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#111] border border-white/10 max-w-3xl w-full overflow-hidden flex flex-col md:flex-row relative"
            >
              <button onClick={() => setSelectedTrainer(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-red-600 transition-colors">
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-5/12 aspect-square md:aspect-auto relative" style={{ minHeight: '360px' }}>
                <img src={TRAINERS[selectedTrainer].image} alt={TRAINERS[selectedTrainer].name}
                  className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              <div className={`p-8 md:p-10 flex flex-col justify-center md:w-7/12 ${isRtl ? 'text-right' : ''}`}>
                <div className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-3">
                  {TRAINERS[selectedTrainer].specialty[lang]}
                </div>
                <h3 className="font-display text-4xl uppercase mb-6">{TRAINERS[selectedTrainer].name}</h3>
                <p className="text-white/60 leading-relaxed mb-8 text-sm italic">
                  <TypewriterText text={TRAINERS[selectedTrainer].bio[lang]} />
                </p>
                <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                  <div>
                    <div className="font-display text-5xl text-white">{TRAINERS[selectedTrainer].exp}</div>
                    <div className="text-[10px] text-red-500 uppercase tracking-widest font-black">
                      {lang === 'fr' ? "Ans d'exp." : 'سنة خبرة'}
                    </div>
                  </div>
                  <Award className="w-12 h-12 text-white/5" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ghost watermark */}
      <div className="fixed bottom-0 inset-x-0 pointer-events-none select-none overflow-hidden opacity-[0.025]">
        <div className="font-display text-[20vw] leading-none text-white whitespace-nowrap">
          NO PAIN NO GAIN
        </div>
      </div>
    </div>
  );
}
