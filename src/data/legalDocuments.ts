import type { LocalizedString } from '@/types/property'

export type LegalDocumentId = 'privacy' | 'cookies' | 'legal'

export interface LegalSection {
  title: LocalizedString
  paragraphs: LocalizedString[]
}

export interface LegalDocument {
  title: LocalizedString
  updatedAt: LocalizedString
  sections: LegalSection[]
}

export const LEGAL_DOCUMENTS: Record<LegalDocumentId, LegalDocument> = {
  legal: {
    title: {
      es: 'Aviso legal',
      ca: 'Avís legal',
      en: 'Legal notice',
      fr: 'Mentions légales',
    },
    updatedAt: {
      es: 'Última actualización: 16 de julio de 2026',
      ca: 'Darrera actualització: 16 de juliol de 2026',
      en: 'Last updated: 16 July 2026',
      fr: 'Dernière mise à jour : 16 juillet 2026',
    },
    sections: [
      {
        title: {
          es: '1. Datos identificativos',
          ca: '1. Dades identificatives',
          en: '1. Identification details',
          fr: '1. Informations d’identification',
        },
        paragraphs: [
          {
            es: 'En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que el titular de este sitio web es Golden Home Lloret S.L. (en adelante, «Golden Home»), con domicilio en Av. Pau Casals 38, 17310 Lloret de Mar (Girona), España, correo electrónico goldenhomelloret@gmail.com, teléfono +34 601 901 275 y sitio web https://goldenhomelloret.es.',
            ca: 'En compliment de l’article 10 de la Llei 34/2002, d’11 de juliol, de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSI-CE), s’informa que el titular d’aquest lloc web és Golden Home Lloret S.L. (d’ara endavant, «Golden Home»), amb domicili a Av. Pau Casals 38, 17310 Lloret de Mar (Girona), Espanya, correu electrònic goldenhomelloret@gmail.com, telèfon +34 601 901 275 i lloc web https://goldenhomelloret.es.',
            en: 'In compliance with Article 10 of Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE), the owner of this website is Golden Home Lloret S.L. («Golden Home»), registered address Av. Pau Casals 38, 17310 Lloret de Mar (Girona), Spain, email goldenhomelloret@gmail.com, phone +34 601 901 275 and website https://goldenhomelloret.es.',
            fr: 'Conformément à l’article 10 de la loi 34/2002 du 11 juillet relative aux services de la société de l’information et au commerce électronique (LSSI-CE), le titulaire de ce site est Golden Home Lloret S.L. (« Golden Home »), domicilié Av. Pau Casals 38, 17310 Lloret de Mar (Girona), Espagne, e-mail goldenhomelloret@gmail.com, téléphone +34 601 901 275 et site https://goldenhomelloret.es.',
          },
        ],
      },
      {
        title: {
          es: '2. Objeto y ámbito de aplicación',
          ca: '2. Objecte i àmbit d’aplicació',
          en: '2. Purpose and scope',
          fr: '2. Objet et champ d’application',
        },
        paragraphs: [
          {
            es: 'El presente aviso legal regula el acceso, la navegación y el uso del sitio web goldenhomelloret.es, así como las responsabilidades derivadas de la utilización de sus contenidos. Golden Home es una agencia inmobiliaria dedicada a la intermediación en la compraventa y alquiler de inmuebles en Lloret de Mar y la Costa Brava.',
            ca: 'El present avís legal regula l’accés, la navegació i l’ús del lloc web goldenhomelloret.es, així com les responsabilitats derivades de l’utilització dels seus continguts. Golden Home és una agència immobiliària dedicada a la intermediació en la compravenda i lloguer d’immobles a Lloret de Mar i la Costa Brava.',
            en: 'This legal notice governs access to, browsing of and use of the website goldenhomelloret.es, as well as liability arising from use of its content. Golden Home is a real estate agency engaged in property sales and rentals in Lloret de Mar and the Costa Brava.',
            fr: 'Le présent avis légal régit l’accès, la navigation et l’utilisation du site goldenhomelloret.es, ainsi que la responsabilité liée à l’usage de ses contenus. Golden Home est une agence immobilière spécialisée dans la vente et la location de biens à Lloret de Mar et sur la Costa Brava.',
          },
        ],
      },
      {
        title: {
          es: '3. Condiciones de uso',
          ca: '3. Condicions d’ús',
          en: '3. Terms of use',
          fr: '3. Conditions d’utilisation',
        },
        paragraphs: [
          {
            es: 'El acceso al sitio implica la aceptación sin reservas de las presentes condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos, absteniéndose de emplearlos para actividades ilícitas, lesivas de derechos de terceros o que puedan dañar el normal funcionamiento del sitio. Golden Home se reserva el derecho de modificar, suspender o restringir el acceso a la web en cualquier momento.',
            ca: 'L’accés al lloc implica l’acceptació sense reserves de les presents condicions. L’usuari es compromet a fer un ús adequat dels continguts, abstenint-se d’utilitzar-los per a activitats il·lícites, lesives de drets de tercers o que puguin danyar el funcionament normal del lloc. Golden Home es reserva el dret de modificar, suspendre o restringir l’accés a la web en qualsevol moment.',
            en: 'Access to the site implies unreserved acceptance of these terms. Users agree to use the content appropriately and not for unlawful activities, infringement of third-party rights or actions that may harm normal operation of the site. Golden Home reserves the right to modify, suspend or restrict access at any time.',
            fr: 'L’accès au site implique l’acceptation sans réserve des présentes conditions. L’utilisateur s’engage à utiliser les contenus de manière appropriée et à ne pas les employer à des fins illicites ou préjudiciables. Golden Home se réserve le droit de modifier, suspendre ou restreindre l’accès à tout moment.',
          },
        ],
      },
      {
        title: {
          es: '4. Propiedad intelectual e industrial',
          ca: '4. Propietat intel·lectual i industrial',
          en: '4. Intellectual and industrial property',
          fr: '4. Propriété intellectuelle et industrielle',
        },
        paragraphs: [
          {
            es: 'Los contenidos del sitio web (textos, imágenes, logotipos, diseño, código fuente y bases de datos) están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o transformación sin autorización expresa de Golden Home o de sus legítimos titulares.',
            ca: 'Els continguts del lloc web (textos, imatges, logotips, disseny, codi font i bases de dades) estan protegits per la legislació espanyola i internacional sobre propietat intel·lectual i industrial. Queda prohibida la seva reproducció, distribució o transformació sense autorització expressa de Golden Home o dels seus legítims titulars.',
            en: 'Website content (text, images, logos, design, source code and databases) is protected under Spanish and international intellectual and industrial property law. Reproduction, distribution or transformation without express authorisation from Golden Home or legitimate rights holders is prohibited.',
            fr: 'Les contenus du site (textes, images, logos, design, code source et bases de données) sont protégés par la législation espagnole et internationale. Toute reproduction, distribution ou transformation sans autorisation expresse de Golden Home ou des titulaires légitimes est interdite.',
          },
        ],
      },
      {
        title: {
          es: '5. Responsabilidad',
          ca: '5. Responsabilitat',
          en: '5. Liability',
          fr: '5. Responsabilité',
        },
        paragraphs: [
          {
            es: 'Golden Home no garantiza la ausencia de errores en los contenidos ni la disponibilidad ininterrumpida del sitio. La información sobre inmuebles tiene carácter orientativo y no constituye oferta vinculante hasta la formalización del correspondiente contrato. Golden Home no se hace responsable de los daños derivados del uso del sitio ni de enlaces a sitios de terceros.',
            ca: 'Golden Home no garanteix l’absència d’errors en els continguts ni la disponibilitat ininterrompuda del lloc. La informació sobre immobles té caràcter orientatiu i no constitueix oferta vinculant fins a la formalització del contracte corresponent. Golden Home no es fa responsable dels danys derivats de l’ús del lloc ni d’enllaços a llocs de tercers.',
            en: 'Golden Home does not guarantee error-free content or uninterrupted availability. Property information is indicative and does not constitute a binding offer until the relevant contract is formalised. Golden Home is not liable for damages arising from use of the site or links to third-party websites.',
            fr: 'Golden Home ne garantit ni l’absence d’erreurs ni la disponibilité ininterrompue du site. Les informations sur les biens sont indicatives et ne constituent pas une offre ferme tant que le contrat n’est pas formalisé. Golden Home décline toute responsabilité pour les dommages liés à l’utilisation du site ou aux liens vers des sites tiers.',
          },
        ],
      },
      {
        title: {
          es: '6. Legislación aplicable y jurisdicción',
          ca: '6. Legislació aplicable i jurisdicció',
          en: '6. Applicable law and jurisdiction',
          fr: '6. Droit applicable et juridiction',
        },
        paragraphs: [
          {
            es: 'Las relaciones entre Golden Home y los usuarios se regirán por la legislación española. Para la resolución de controversias, las partes se someten a los Juzgados y Tribunales de Girona, salvo que la normativa de consumidores y usuarios disponga otra cosa.',
            ca: 'Les relacions entre Golden Home i els usuaris es regiran per la legislació espanyola. Per a la resolució de controvèrsies, les parts es sotmeten als Jutjats i Tribunals de Girona, llevat que la normativa de consumidors i usuaris en disposi una altra.',
            en: 'Relations between Golden Home and users shall be governed by Spanish law. For dispute resolution, the parties submit to the Courts of Girona, unless consumer protection rules provide otherwise.',
            fr: 'Les relations entre Golden Home et les utilisateurs sont régies par le droit espagnol. En cas de litige, les parties se soumettent aux tribunaux de Girona, sauf disposition contraire en matière de protection des consommateurs.',
          },
        ],
      },
    ],
  },
  privacy: {
    title: {
      es: 'Política de privacidad',
      ca: 'Política de privacitat',
      en: 'Privacy policy',
      fr: 'Politique de confidentialité',
    },
    updatedAt: {
      es: 'Última actualización: 16 de julio de 2026',
      ca: 'Darrera actualització: 16 de juliol de 2026',
      en: 'Last updated: 16 July 2026',
      fr: 'Dernière mise à jour : 16 juillet 2026',
    },
    sections: [
      {
        title: {
          es: '1. Responsable del tratamiento',
          ca: '1. Responsable del tractament',
          en: '1. Data controller',
          fr: '1. Responsable du traitement',
        },
        paragraphs: [
          {
            es: 'Responsable: Golden Home Lloret S.L. · Domicilio: Av. Pau Casals 38, 17310 Lloret de Mar (Girona), España · Email: goldenhomelloret@gmail.com · Teléfono: +34 601 901 275.',
            ca: 'Responsable: Golden Home Lloret S.L. · Domicili: Av. Pau Casals 38, 17310 Lloret de Mar (Girona), Espanya · Correu: goldenhomelloret@gmail.com · Telèfon: +34 601 901 275.',
            en: 'Controller: Golden Home Lloret S.L. · Address: Av. Pau Casals 38, 17310 Lloret de Mar (Girona), Spain · Email: goldenhomelloret@gmail.com · Phone: +34 601 901 275.',
            fr: 'Responsable : Golden Home Lloret S.L. · Adresse : Av. Pau Casals 38, 17310 Lloret de Mar (Girona), Espagne · E-mail : goldenhomelloret@gmail.com · Téléphone : +34 601 901 275.',
          },
        ],
      },
      {
        title: {
          es: '2. Finalidades y base legal',
          ca: '2. Finalitats i base legal',
          en: '2. Purposes and legal basis',
          fr: '2. Finalités et base légale',
        },
        paragraphs: [
          {
            es: 'Tratamos sus datos para: (a) gestionar consultas y solicitudes de información sobre inmuebles (interés legítimo y ejecución de medidas precontractuales); (b) prestar servicios de intermediación inmobiliaria (ejecución de contrato); (c) enviar comunicaciones comerciales sobre nuestros servicios, previo consentimiento cuando sea exigible; (d) cumplir obligaciones legales en materia fiscal, mercantil y de prevención del blanqueo de capitales aplicables a la actividad inmobiliaria.',
            ca: 'Tractem les seves dades per a: (a) gestionar consultes i sol·licituds d’informació sobre immobles (interès legítim i execució de mesures precontractuals); (b) prestar serveis d’intermediació immobiliària (execució de contracte); (c) enviar comunicacions comercials sobre els nostres serveis, prèvi consentiment quan sigui exigible; (d) complir obligacions legals en matèria fiscal, mercantil i de prevenció del blanqueig de capitals aplicables a l’activitat immobiliària.',
            en: 'We process your data to: (a) handle enquiries and property information requests (legitimate interest and pre-contractual steps); (b) provide real estate brokerage services (contract performance); (c) send commercial communications about our services, with consent where required; (d) comply with legal obligations in tax, commercial and anti-money laundering matters applicable to real estate activity.',
            fr: 'Nous traitons vos données pour : (a) gérer les demandes d’information sur les biens (intérêt légitime et mesures précontractuelles) ; (b) fournir des services de courtage immobilier (exécution du contrat) ; (c) envoyer des communications commerciales, avec consentement le cas échéant ; (d) respecter les obligations légales fiscales, commerciales et de lutte contre le blanchiment applicables à l’activité immobilière.',
          },
        ],
      },
      {
        title: {
          es: '3. Datos que recopilamos',
          ca: '3. Dades que recopilem',
          en: '3. Data we collect',
          fr: '3. Données collectées',
        },
        paragraphs: [
          {
            es: 'Podemos tratar: datos identificativos (nombre, email, teléfono), datos de navegación (dirección IP, dispositivo, cookies técnicas), preferencias guardadas en su dispositivo (favoritos, idioma, moneda, modo oscuro) y, en su caso, información facilitada en formularios de contacto o durante procesos de compraventa o alquiler.',
            ca: 'Podem tractar: dades identificatives (nom, correu, telèfon), dades de navegació (adreça IP, dispositiu, galetes tècniques), preferències guardades al dispositiu (favorits, idioma, moneda, mode fosc) i, si escau, informació facilitada en formularis de contacte o durant processos de compravenda o lloguer.',
            en: 'We may process: identification data (name, email, phone), browsing data (IP address, device, technical cookies), preferences stored on your device (favourites, language, currency, dark mode) and information provided via contact forms or during sale or rental processes.',
            fr: 'Nous pouvons traiter : données d’identification (nom, e-mail, téléphone), données de navigation (adresse IP, appareil, cookies techniques), préférences enregistrées sur votre appareil (favoris, langue, devise, mode sombre) et informations fournies via les formulaires de contact ou lors de transactions immobilières.',
          },
        ],
      },
      {
        title: {
          es: '4. Conservación y destinatarios',
          ca: '4. Conservació i destinataris',
          en: '4. Retention and recipients',
          fr: '4. Conservation et destinataires',
        },
        paragraphs: [
          {
            es: 'Conservaremos los datos mientras mantenga una relación con Golden Home y, posteriormente, durante los plazos legales aplicables. No cedemos datos a terceros salvo obligación legal, encargo de tratamiento a proveedores (hosting, email, mapas) con contratos conforme al RGPD, o consentimiento expreso del interesado.',
            ca: 'Conservarem les dades mentre mantingui una relació amb Golden Home i, posteriorment, durant els terminis legals aplicables. No cedim dades a tercers llevat d’obligació legal, encàrrec de tractament a proveïdors (hosting, correu, mapes) amb contractes conforme al RGPD, o consentiment express de l’interessat.',
            en: 'We retain data while you maintain a relationship with Golden Home and thereafter for applicable legal periods. We do not share data with third parties except where legally required, through processors (hosting, email, maps) under GDPR-compliant agreements, or with your express consent.',
            fr: 'Nous conservons les données tant qu’une relation est maintenue avec Golden Home, puis pendant les délais légaux. Nous ne communiquons pas les données à des tiers sauf obligation légale, sous-traitants (hébergement, e-mail, cartes) conformes au RGPD, ou avec votre consentement exprès.',
          },
        ],
      },
      {
        title: {
          es: '5. Derechos del interesado',
          ca: '5. Drets de l’interessat',
          en: '5. Your rights',
          fr: '5. Vos droits',
        },
        paragraphs: [
          {
            es: 'Puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad enviando un email a goldenhomelloret@gmail.com, acreditando su identidad. Si considera que no se han atendido sus derechos, puede reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).',
            ca: 'Pot exercir els drets d’accés, rectificació, supressió, oposició, limitació del tractament i portabilitat enviant un correu a goldenhomelloret@gmail.com, acreditant la seva identitat. Si considera que no s’han atès els seus drets, pot reclamar davant l’Agència Espanyola de Protecció de Dades (www.aepd.es).',
            en: 'You may exercise rights of access, rectification, erasure, objection, restriction and portability by emailing goldenhomelloret@gmail.com with proof of identity. If you believe your rights have not been addressed, you may lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).',
            fr: 'Vous pouvez exercer vos droits d’accès, de rectification, d’effacement, d’opposition, de limitation et de portabilité en écrivant à goldenhomelloret@gmail.com avec justificatif d’identité. Vous pouvez également saisir l’Agence espagnole de protection des données (www.aepd.es).',
          },
        ],
      },
    ],
  },
  cookies: {
    title: {
      es: 'Política de cookies',
      ca: 'Política de galetes',
      en: 'Cookie policy',
      fr: 'Politique de cookies',
    },
    updatedAt: {
      es: 'Última actualización: 16 de julio de 2026',
      ca: 'Darrera actualització: 16 de juliol de 2026',
      en: 'Last updated: 16 July 2026',
      fr: 'Dernière mise à jour : 16 juillet 2026',
    },
    sections: [
      {
        title: {
          es: '1. ¿Qué son las cookies?',
          ca: '1. Què són les galetes?',
          en: '1. What are cookies?',
          fr: '1. Qu’est-ce qu’un cookie ?',
        },
        paragraphs: [
          {
            es: 'Las cookies y tecnologías similares son archivos que se almacenan en su dispositivo al visitar un sitio web. Permiten recordar preferencias, mantener la sesión o analizar el uso del sitio, según su finalidad.',
            ca: 'Les galetes i tecnologies similars són fitxers que s’emmagatzemen al dispositiu en visitar un lloc web. Permeten recordar preferències, mantenir la sessió o analitzar l’ús del lloc, segons la finalitat.',
            en: 'Cookies and similar technologies are files stored on your device when you visit a website. They remember preferences, maintain sessions or analyse site usage, depending on their purpose.',
            fr: 'Les cookies et technologies similaires sont des fichiers stockés sur votre appareil lors de la visite d’un site. Ils permettent de mémoriser des préférences, maintenir une session ou analyser l’usage du site.',
          },
        ],
      },
      {
        title: {
          es: '2. Cookies que utilizamos',
          ca: '2. Galetes que utilitzem',
          en: '2. Cookies we use',
          fr: '2. Cookies utilisés',
        },
        paragraphs: [
          {
            es: 'Cookies técnicas o necesarias: imprescindibles para el funcionamiento del sitio (preferencias de idioma, almacenamiento local de favoritos, comparador, modo oscuro y consentimiento de cookies). Base legal: interés legítimo y, en su caso, consentimiento.',
            ca: 'Galetes tècniques o necessàries: imprescindibles per al funcionament del lloc (preferències d’idioma, emmagatzematge local de favorits, comparador, mode fosc i consentiment de galetes). Base legal: interès legítim i, si escau, consentiment.',
            en: 'Technical or necessary cookies: essential for site operation (language preferences, local storage of favourites, compare list, dark mode and cookie consent). Legal basis: legitimate interest and, where applicable, consent.',
            fr: 'Cookies techniques ou nécessaires : indispensables au fonctionnement du site (langue, favoris locaux, comparateur, mode sombre et consentement cookies). Base légale : intérêt légitime et, le cas échéant, consentement.',
          },
          {
            es: 'Cookies de terceros: Google Maps (visualización de mapas) y Google Fonts (tipografías) pueden instalar cookies propias al cargar sus servicios. Consulte las políticas de Google para más información.',
            ca: 'Galetes de tercers: Google Maps (visualització de mapes) i Google Fonts (tipografies) poden instal·lar galetes pròpies en carregar els seus serveis. Consulteu les polítiques de Google per a més informació.',
            en: 'Third-party cookies: Google Maps (map display) and Google Fonts (typography) may set their own cookies when loading their services. See Google’s policies for details.',
            fr: 'Cookies tiers : Google Maps (cartes) et Google Fonts (polices) peuvent déposer leurs propres cookies. Consultez les politiques de Google pour plus d’informations.',
          },
        ],
      },
      {
        title: {
          es: '3. Gestión del consentimiento',
          ca: '3. Gestió del consentiment',
          en: '3. Managing consent',
          fr: '3. Gestion du consentement',
        },
        paragraphs: [
          {
            es: 'Al acceder por primera vez, mostramos un aviso para que pueda aceptar o rechazar cookies no esenciales. Puede modificar su elección en cualquier momento desde el enlace «Política de cookies» del pie de página o configurando su navegador para bloquear o eliminar cookies.',
            ca: 'En accedir per primera vegada, mostrem un avís perquè pugui acceptar o rebutjar galetes no essencials. Pot modificar la seva elecció en qualsevol moment des de l’enllaç «Política de galetes» del peu de pàgina o configurant el navegador per bloquejar o eliminar galetes.',
            en: 'On first access we show a notice so you can accept or reject non-essential cookies. You may change your choice at any time via the «Cookie policy» link in the footer or through your browser settings.',
            fr: 'Lors de votre première visite, un bandeau vous permet d’accepter ou refuser les cookies non essentiels. Vous pouvez modifier votre choix via le lien « Politique de cookies » en pied de page ou les paramètres de votre navigateur.',
          },
        ],
      },
      {
        title: {
          es: '4. Cómo desactivar cookies en su navegador',
          ca: '4. Com desactivar galetes al navegador',
          en: '4. How to disable cookies in your browser',
          fr: '4. Désactiver les cookies dans le navigateur',
        },
        paragraphs: [
          {
            es: 'Puede configurar su navegador para rechazar cookies. En Chrome: Configuración > Privacidad y seguridad > Cookies. En Firefox: Opciones > Privacidad y seguridad. En Safari: Preferencias > Privacidad. Tenga en cuenta que desactivar cookies técnicas puede afectar al funcionamiento del sitio.',
            ca: 'Pot configurar el navegador per rebutjar galetes. A Chrome: Configuració > Privadesa i seguretat > Galetes. A Firefox: Opcions > Privadesa i seguretat. A Safari: Preferències > Privadesa. Tingui en compte que desactivar galetes tècniques pot afectar el funcionament del lloc.',
            en: 'You can configure your browser to reject cookies. In Chrome: Settings > Privacy and security > Cookies. In Firefox: Options > Privacy & Security. In Safari: Preferences > Privacy. Disabling technical cookies may affect site functionality.',
            fr: 'Vous pouvez configurer votre navigateur pour refuser les cookies. Chrome : Paramètres > Confidentialité > Cookies. Firefox : Options > Vie privée. Safari : Préférences > Confidentialité. La désactivation des cookies techniques peut affecter le fonctionnement du site.',
          },
        ],
      },
    ],
  },
}
