import type { TeamMember } from '@/types'

export const TEAM: TeamMember[] = [
  {
    id: 'team-001',
    name: 'María González',
    role: {
      es: 'Directora General',
      ca: 'Directora General',
      en: 'Managing Director',
      fr: 'Directrice Générale',
    },
    bio: {
      es: 'Con más de 15 años de experiencia en el mercado inmobiliario de lujo de la Costa Brava, María lidera Golden Home con una visión centrada en la excelencia y la confianza del cliente. Especialista en operaciones internacionales y negociación de propiedades premium.',
      ca: "Amb més de 15 anys d'experiència en el mercat immobiliari de luxe de la Costa Brava, la María lidera Golden Home amb una visió centrada en l'excel·lència i la confiança del client. Especialista en operacions internacionals i negociació de propietats premium.",
      en: 'With over 15 years of experience in the Costa Brava luxury real estate market, María leads Golden Home with a vision focused on excellence and client trust. Specialist in international operations and premium property negotiation.',
      fr: "Avec plus de 15 ans d'expérience sur le marché immobilier de luxe de la Costa Brava, María dirige Golden Home avec une vision centrée sur l'excellence et la confiance client. Spécialiste des opérations internationales et de la négociation de biens premium.",
    },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
  },
  {
    id: 'team-002',
    name: 'Jordi Puig',
    role: {
      es: 'Asesor Senior de Propiedades',
      ca: 'Assessor Sènior de Propietats',
      en: 'Senior Property Advisor',
      fr: 'Conseiller Senior en Immobilier',
    },
    bio: {
      es: 'Nativo de Lloret de Mar, Jordi conoce cada cala, urbanización y tendencia del mercado local. Acompaña a compradores y vendedores con un servicio personalizado, desde la primera visita hasta el cierre de la operación.',
      ca: 'Natiu de Lloret de Mar, el Jordi coneix cada cala, urbanització i tendència del mercat local. Acompanya compradors i venedors amb un servei personalitzat, des de la primera visita fins al tancament de l\'operació.',
      en: 'A native of Lloret de Mar, Jordi knows every cove, development and local market trend. He guides buyers and sellers with personalised service from the first viewing to completion.',
      fr: 'Natif de Lloret de Mar, Jordi connaît chaque crique, urbanisation et tendance du marché local. Il accompagne acheteurs et vendeurs avec un service personnalisé, de la première visite à la signature.',
    },
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
  },
  {
    id: 'team-003',
    name: 'Sophie Laurent',
    role: {
      es: 'Consultora Internacional',
      ca: 'Consultora Internacional',
      en: 'International Consultant',
      fr: 'Consultante Internationale',
    },
    bio: {
      es: 'Franco-española con fluidez en cuatro idiomas, Sophie atiende a clientes de toda Europa y más allá. Experta en fiscalidad internacional, inversión residencial y relocalización en la Costa Brava.',
      ca: 'Franco-espanyola amb fluïdesa en quatre idiomes, la Sophie atén clients de tota Europa i més enllà. Experta en fiscalitat internacional, inversió residencial i relocalització a la Costa Brava.',
      en: 'Franco-Spanish with fluency in four languages, Sophie serves clients across Europe and beyond. Expert in international taxation, residential investment and relocation to the Costa Brava.',
      fr: 'Franco-espagnole fluent en quatre langues, Sophie accompagne des clients dans toute l\'Europe et au-delà. Experte en fiscalité internationale, investissement résidentiel et relocalisation sur la Costa Brava.',
    },
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
  },
]
