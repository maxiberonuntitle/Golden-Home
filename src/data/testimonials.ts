import type { Testimonial } from '@/types'

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-001',
    name: 'Thomas & Catherine Müller',
    location: {
      es: 'Múnich, Alemania',
      ca: 'Múnic, Alemanya',
      en: 'Munich, Germany',
      fr: 'Munich, Allemagne',
    },
    text: {
      es: 'Golden Home nos encontró la villa perfecta en Fenals con vistas al mar. El proceso fue impecable, transparente y con una atención excepcional en alemán e inglés. Recomendamos su servicio sin reservas.',
      ca: 'Golden Home ens va trobar la vila perfecta a Fenals amb vistes al mar. El procés va ser impecable, transparent i amb una atenció excepcional en alemany i anglès. Recomanem el seu servei sense reserves.',
      en: 'Golden Home found us the perfect villa in Fenals with sea views. The process was flawless, transparent and with exceptional attention in German and English. We recommend their service without hesitation.',
      fr: 'Golden Home nous a trouvé la villa parfaite à Fenals avec vue mer. Le processus a été impeccable, transparent et avec une attention exceptionnelle en allemand et anglais. Nous recommandons leur service sans réserve.',
    },
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    id: 'testimonial-002',
    name: 'Pierre & Isabelle Dubois',
    location: {
      es: 'París, Francia',
      ca: 'París, França',
      en: 'Paris, France',
      fr: 'Paris, France',
    },
    text: {
      es: 'Compramos un ático de lujo en Lloret de Mar gracias al equipo de Sophie. Su conocimiento del mercado francés y español facilitó toda la documentación y la negociación. Un servicio verdaderamente premium.',
      ca: 'Vam comprar un àtic de luxe a Lloret de Mar gràcies a l\'equip de la Sophie. El seu coneixement del mercat francès i espanyol va facilitar tota la documentació i la negociació. Un servei veritablement premium.',
      en: 'We purchased a luxury penthouse in Lloret de Mar thanks to Sophie\'s team. Their knowledge of the French and Spanish markets made all documentation and negotiation seamless. A truly premium service.',
      fr: 'Nous avons acheté un penthouse de luxe à Lloret de Mar grâce à l\'équipe de Sophie. Leur connaissance des marchés français et espagnol a facilité toute la documentation et la négociation. Un service véritablement premium.',
    },
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    id: 'testimonial-003',
    name: 'Elena & Marc Vidal',
    location: {
      es: 'Barcelona, España',
      ca: 'Barcelona, Espanya',
      en: 'Barcelona, Spain',
      fr: 'Barcelone, Espagne',
    },
    text: {
      es: 'Vendimos nuestra finca en Santa Cristina en tiempo récord y al mejor precio del mercado. Jordi supo valorar la propiedad correctamente y gestionar visitas selectas con compradores cualificados.',
      ca: 'Vam vendre la nostra masia a Santa Cristina en temps rècord i al millor preu del mercat. El Jordi va saber valorar la propietat correctament i gestionar visites selectes amb compradors qualificats.',
      en: 'We sold our estate in Santa Cristina in record time and at the best market price. Jordi accurately valued the property and managed selective viewings with qualified buyers.',
      fr: 'Nous avons vendu notre mas à Santa Cristina en un temps record et au meilleur prix du marché. Jordi a correctement estimé le bien et géré des visites sélectives avec des acheteurs qualifiés.',
    },
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
]
