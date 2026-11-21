// js/scenarios.js
// Banco extendido de 18 casos operativos reales para Neotel

export const SCENARIOS = [
  // 1. RELLAMAR: LLAMAR (Corte sin negativa)
  {
    id: 1,
    title: "Llamada con corte imprevisto de señal",
    lead: {
      id: "5620197",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Paola",
      lastName: "Valerio",
      phone: "0341155458969",
      phone2: "",
      dni: "34882190",
      email: "paola.valerio@email.com",
      product: "megasteelar",
      affiliate: "Weinlol",
      publisher: "rain",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso1.mp3",
    fallbackDuration: 5,
    transcript: [
      { speaker: "Asesor", text: "Hola buenos días, ¿hablo con Paola Valerio?" },
      { speaker: "Cliente", text: "Hola sí... aguardame que voy cruzando un puente y se corta la comu... *CLIC*" }
    ],
    expected: {
      category: "RELLAMAR",
      subcategory: "LLAMAR",
      agendaPhone: "0341155458969"
    },
    explanation: "Si la llamada se corta sin una NEGATIVA en la conversación, la regla exige RELLAMAR + LLAMAR y seleccionar el teléfono en agenda."
  },

  // 2. RELLAMAR: Contestador
  {
    id: 2,
    title: "Casilla de mensajes automática",
    lead: {
      id: "5614014",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Marcos",
      lastName: "Ruiz",
      phone: "0111540455508",
      phone2: "",
      dni: "29443211",
      email: "mruiz@gmail.com",
      product: "hondrodox",
      affiliate: "KML",
      publisher: "4g24l2j7euap00n4",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso2.mp3",
    fallbackDuration: 4,
    transcript: [
      { speaker: "Operadora Automática", text: "Tu llamada está siendo transferida a la casilla de mensajes... *BEEP*" }
    ],
    expected: {
      category: "RELLAMAR",
      subcategory: "CONTESTADOR",
      agendaPhone: "0111540455508"
    },
    explanation: "Al ingresar contestador automático, se tabula RELLAMAR + Contestador y se selecciona el teléfono en agenda."
  },

  // 3. NO CONTACTO: Basura Desconoce contacto (No me llamen más)
  {
    id: 3,
    title: "Cliente molesto pide no ser contactado",
    lead: {
      id: "5625510",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Jorge",
      lastName: "Altamirano",
      phone: "01149987744",
      phone2: "",
      dni: "20112334",
      email: "",
      product: "megasteelar",
      affiliate: "Weinlol",
      publisher: "rain",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso3.mp3",
    fallbackDuration: 6,
    transcript: [
      { speaker: "Asesor", text: "Hola don Jorge, le llamamos por su consulta de Megasteelar..." },
      { speaker: "Cliente", text: "¡Dejen de molestarme! No me llamen más en su vida, yo no pedí nada. ¡Bórrenme ya! *CLIC*" }
    ],
    expected: {
      category: "NO_CONTACTO",
      subcategory: "BASURA_DESCONOCE",
      agendaPhone: null
    },
    explanation: "Si dice 'no me llamen más', insulta o afirma que nunca dejó los datos, NO se rellama. Corresponde NO CONTACTO + Basura Desconoce contacto."
  },

  // 4. CONTACTO: Venta Confirmada
  {
    id: 4,
    title: "Cierre exitoso de venta",
    lead: {
      id: "5619982",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Olga",
      lastName: "Verga",
      phone: "0388154711048",
      phone2: "",
      dni: "18290344",
      email: "olgaverga@yahoo.com.ar",
      product: "hondrodox",
      affiliate: "AFFONE",
      publisher: "2450579",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso4.mp3",
    fallbackDuration: 7,
    transcript: [
      { speaker: "Asesor", text: "Sra. Olga, le confirmo el despacho de 3 unidades a su domicilio en Jujuy con pago al cartero." },
      { speaker: "Cliente", text: "Sí señorita, perfecto, lo espero acá para pagar cuando llegue." }
    ],
    expected: {
      category: "CONTACTO",
      subcategory: "VENTA_CONFIRMADA",
      agendaPhone: null
    },
    explanation: "El titular confirma la compra del producto. Corresponde CONTACTO + Venta Confirmada."
  },

  // 5. CONTACTO: Rechazo, No cta con dinero (Lo quiere pensar / Consultar con tercero)
  {
    id: 5,
    title: "Objeción 'Lo tengo que pensar / Consultar con tercero'",
    lead: {
      id: "5626701",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Marta",
      lastName: "Suárez",
      phone: "02234551122",
      phone2: "",
      dni: "25887411",
      email: "",
      product: "hondrodox",
      affiliate: "KML",
      publisher: "4g24l2j7euap00n4",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso5.mp3",
    fallbackDuration: 7,
    transcript: [
      { speaker: "Asesor", text: "Doña Marta, ¿aprovechamos la promoción de tratamiento con envío gratis?" },
      { speaker: "Cliente", text: "Me parece lindo pero tengo que consultarlo con mi esposo a la noche y pensarlo bien, no dispongo de plata ahora." }
    ],
    expected: {
      category: "CONTACTO",
      subcategory: "RECHAZO_SIN_DINERO",
      agendaPhone: null
    },
    explanation: "Regla estricta: Cuando el cliente dice 'lo quiere pensar', 'debe consultar con un tercero' o no tiene dinero, se tabula CONTACTO + Rechazo, No cta con dinero."
  },

  // 6. NO CONTACTO: Basura, Numero equivocado
  {
    id: 6,
    title: "Atiende persona desconocida en el número",
    lead: {
      id: "5630012",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Esteban",
      lastName: "López",
      phone: "03514781234",
      phone2: "",
      dni: "30221455",
      email: "",
      product: "megasteelar",
      affiliate: "Weinlol",
      publisher: "rain",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso6.mp3",
    fallbackDuration: 5,
    transcript: [
      { speaker: "Asesor", text: "Hola, ¿se encuentra don Esteban López?" },
      { speaker: "Cliente", text: "Equivocado flaco, acá no vive ningún Esteban, tengo esta línea hace años." }
    ],
    expected: {
      category: "NO_CONTACTO",
      subcategory: "BASURA_NUM_EQUIVOCADO",
      agendaPhone: null
    },
    explanation: "Al confirmar que el número no pertenece al titular de la ficha, se cierra como NO CONTACTO + Basura, Numero equivocado."
  },

  // 7. CONTACTO: Rechazo, Costo del producto difiere con publicación
  {
    id: 7,
    title: "Reclamo por precio diferente al anuncio de redes",
    lead: {
      id: "5631140",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Raúl",
      lastName: "Morales",
      phone: "02614569874",
      phone2: "",
      dni: "24556112",
      email: "rmorales@gmail.com",
      product: "megasteelar",
      affiliate: "AFFONE",
      publisher: "2450579",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso7.mp3",
    fallbackDuration: 7,
    transcript: [
      { speaker: "Asesor", text: "Don Raúl, el costo del tratamiento completo es de $29.000..." },
      { speaker: "Cliente", text: "¡En Instagram decía $8.500! Son unos mentirosos, me parece una estafa que cambien el precio, no quiero nada." }
    ],
    expected: {
      category: "CONTACTO",
      subcategory: "RECHAZO_COSTO_DIFIERE",
      agendaPhone: null
    },
    explanation: "El cliente rechaza porque el precio ofrecido es distinto al de la publicación. Corresponde CONTACTO + Rechazo, Costo del producto difiere con publicación."
  },

  // 8. CONTACTO: Rechazo, Problemas con TC
  {
    id: 8,
    title: "Tarjeta rechazada por falta de saldo / límite",
    lead: {
      id: "5632299",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Valeria",
      lastName: "Castro",
      phone: "01155447788",
      phone2: "",
      dni: "36774112",
      email: "valecastro@hotmail.com",
      product: "hondrodox",
      affiliate: "KML",
      publisher: "4g24l2j7euap00n4",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso8.mp3",
    fallbackDuration: 7,
    transcript: [
      { speaker: "Asesor", text: "Sra. Valeria, el sistema nos indica que su tarjeta fue rechazada por falta de límite disponible." },
      { speaker: "Cliente", text: "Uh qué macana, la debo tener al tope este mes. No tengo otra forma de pagar ahora, dejemos sin efecto la orden." }
    ],
    expected: {
      category: "CONTACTO",
      subcategory: "RECHAZO_PROBLEMAS_TC",
      agendaPhone: null
    },
    explanation: "Al intentar cobrar con tarjeta y dar error por límite insuficiente, corresponde CONTACTO + Rechazo, Problemas con TC."
  },

  // 9. NO CONTACTO: Basura ,Dato cruzado
  {
    id: 9,
    title: "Cliente solicitó un producto totalmente distinto",
    lead: {
      id: "5633355",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Camila",
      lastName: "Díaz",
      phone: "03424112233",
      phone2: "",
      dni: "33114569",
      email: "",
      product: "hondrodox",
      affiliate: "Weinlol",
      publisher: "rain",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso9.mp3",
    fallbackDuration: 6,
    transcript: [
      { speaker: "Asesor", text: "Hola Camila, te llamamos por el suplemento articular Hondrodox..." },
      { speaker: "Cliente", text: "¿Hondrodox? Nada que ver, yo me anoté para comprar una faja masajeadora térmica, no pastillas." }
    ],
    expected: {
      category: "NO_CONTACTO",
      subcategory: "BASURA_DATO_CRUZADO",
      agendaPhone: null
    },
    explanation: "Cuando el cliente busca un producto pero la ficha indica otro completamente diferente, es NO CONTACTO + Basura ,Dato cruzado."
  },

  // 10. NO CONTACTO: Basura , producto SIN STOCK
  {
    id: 10,
    title: "Sin stock del artículo en depósito",
    lead: {
      id: "5634421",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Gonzalo",
      lastName: "Romero",
      phone: "02994781122",
      phone2: "",
      dni: "28994511",
      email: "",
      product: "megasteelar",
      affiliate: "AFFONE",
      publisher: "2450579",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso10.mp3",
    fallbackDuration: 5,
    transcript: [
      { speaker: "Asesor", text: "Don Gonzalo, nos acaban de notificar de depósito que el lote de Megasteelar se encuentra totalmente agotado sin stock." },
      { speaker: "Cliente", text: "Bueno qué lástima, no se haga problema." }
    ],
    expected: {
      category: "NO_CONTACTO",
      subcategory: "BASURA_SIN_STOCK",
      agendaPhone: null
    },
    explanation: "Al no existir stock físico del producto en depósito para despachar, se marca NO CONTACTO + Basura , producto SIN STOCK."
  },

  // 11. NO CONTACTO: Basura Reclamo ya compro
  {
    id: 11,
    title: "Lead duplicado que ya realizó la compra",
    lead: {
      id: "5635588",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Federico",
      lastName: "Paz",
      phone: "03814556677",
      phone2: "",
      dni: "26441233",
      email: "fedepaz@gmail.com",
      product: "hondrodox",
      affiliate: "KML",
      publisher: "4g24l2j7euap00n4",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso11.mp3",
    fallbackDuration: 6,
    transcript: [
      { speaker: "Asesor", text: "Hola Federico, nos comunicamos de Hondrodox..." },
      { speaker: "Cliente", text: "Che pero ya hablé con un chico de ustedes hace 20 minutos y ya le di todos mis datos para el envío. No me manden dos veces." }
    ],
    expected: {
      category: "NO_CONTACTO",
      subcategory: "BASURA_YA_COMPRO",
      agendaPhone: null
    },
    explanation: "Ficha duplicada donde el cliente ya fue atendido y compró previamente. Se tabula NO CONTACTO + Basura Reclamo ya compro."
  },

  // 12. NO CONTACTO: Basura fuera de cobertura
  {
    id: 12,
    title: "Zona rural inaccesible por el correo",
    lead: {
      id: "5636601",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Irma",
      lastName: "Chávez",
      phone: "03875112233",
      phone2: "",
      dni: "17889455",
      email: "",
      product: "hondrodox",
      affiliate: "Weinlol",
      publisher: "rain",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso12.mp3",
    fallbackDuration: 6,
    transcript: [
      { speaker: "Asesor", text: "Sra. Irma, verificamos su código postal en paraje La Quebrada y el correo nos indica que no tiene reparto a domicilio ni sucursal." },
      { speaker: "Cliente", text: "Sí, acá no entra nadie porque es campo adentro sin camino." }
    ],
    expected: {
      category: "NO_CONTACTO",
      subcategory: "BASURA_FUERA_COBERTURA",
      agendaPhone: null
    },
    explanation: "Zonas geográficas donde el correo no llega o no existe cobertura de entrega: NO CONTACTO + Basura fuera de cobertura."
  },

  // 13. CONTACTO: Rechazo, cliente corta disconforme
  {
    id: 13,
    title: "Negativa rotunda y corte abrupto de llamada",
    lead: {
      id: "5637719",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Mariana",
      lastName: "Reyes",
      phone: "01147788990",
      phone2: "",
      dni: "35441223",
      email: "",
      product: "megasteelar",
      affiliate: "AFFONE",
      publisher: "2450579",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso13.mp3",
    fallbackDuration: 5,
    transcript: [
      { speaker: "Asesor", text: "Hola Mariana, te llamamos para asesorarte sobre la promoción..." },
      { speaker: "Cliente", text: "No me interesa nada, chau. *CLIC* (Corta inmediatamente sin dar explicaciones)" }
    ],
    expected: {
      category: "CONTACTO",
      subcategory: "RECHAZO_CORTA_DISCONFORME",
      agendaPhone: null
    },
    explanation: "El titular da una negativa tajante y corta la llamada sin dar mayores explicaciones: CONTACTO + Rechazo, cliente corta disconforme."
  },

  // 14. CONTACTO: Rechazo, No conforme con plazos e envio
  {
    id: 14,
    title: "Rechazo por tiempo excesivo de demora en el envío",
    lead: {
      id: "5638844",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Tomás",
      lastName: "Benítez",
      phone: "03414998877",
      phone2: "",
      dni: "31556987",
      email: "",
      product: "hondrodox",
      affiliate: "KML",
      publisher: "4g24l2j7euap00n4",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso14.mp3",
    fallbackDuration: 6,
    transcript: [
      { speaker: "Asesor", text: "Tomás, el plazo estimado de entrega por correo es de 10 a 14 días hábiles..." },
      { speaker: "Cliente", text: "¿Tanto tarda? No, para esa fecha ya me operé o me fui de viaje, no puedo esperar tanto tiempo. Cancela nomás." }
    ],
    expected: {
      category: "CONTACTO",
      subcategory: "RECHAZO_PLAZOS_ENVIO",
      agendaPhone: null
    },
    explanation: "No está conforme con los tiempos de entrega o costo del envío: CONTACTO + Rechazo, No conforme con plazos e envio."
  },

  // 15. CONTACTO: Rechazo, No conforme con brindar datos de TC
  {
    id: 15,
    title: "Desconfianza en brindar números de tarjeta por teléfono",
    lead: {
      id: "5639912",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Beatriz",
      lastName: "Navarro",
      phone: "01142233445",
      phone2: "",
      dni: "21998744",
      email: "",
      product: "megasteelar",
      affiliate: "Weinlol",
      publisher: "rain",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso15.mp3",
    fallbackDuration: 7,
    transcript: [
      { speaker: "Asesor", text: "Doña Beatriz, para procesar la promoción precisamos los números del frente de su tarjeta..." },
      { speaker: "Cliente", text: "¡Ni loca doy los datos de mi tarjeta por teléfono! No confío en llamadas telefónicas y no tengo efectivo para pagar." }
    ],
    expected: {
      category: "CONTACTO",
      subcategory: "RECHAZO_DATOS_TC",
      agendaPhone: null
    },
    explanation: "No desea brindar los datos de la tarjeta y no dispone de efectivo: CONTACTO + Rechazo, No conforme con brindar datos de TC."
  },

  // 16. CONTACTO: Rechazo, No conforme con Producto (Consulta con médico)
  {
    id: 16,
    title: "Cliente prefiere consultar primero con su médico",
    lead: {
      id: "5640023",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Aníbal",
      lastName: "Roldán",
      phone: "02214889900",
      phone2: "",
      dni: "16778411",
      email: "",
      product: "hondrodox",
      affiliate: "AFFONE",
      publisher: "2450579",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso16.mp3",
    fallbackDuration: 6,
    transcript: [
      { speaker: "Asesor", text: "Don Aníbal, ¿le despachamos entonces el tratamiento para la rodilla?" },
      { speaker: "Cliente", text: "Mire, yo tomo muchos remedios para el corazón y no me convence tomar nada sin que lo apruebe antes mi cardiólogo. No me lo mande." }
    ],
    expected: {
      category: "CONTACTO",
      subcategory: "RECHAZO_PRODUCTO",
      agendaPhone: null
    },
    explanation: "Dudas sobre la idoneidad del producto o consulta previa con su médico: CONTACTO + Rechazo, No conforme con Producto."
  },

  // 17. CONTACTO: rechazo, Solo pago con TC
  {
    id: 17,
    title: "Zona habilitada solo con tarjeta y cliente solo tiene efectivo",
    lead: {
      id: "5641155",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Susana",
      lastName: "Luna",
      phone: "03834556677",
      phone2: "",
      dni: "23887411",
      email: "",
      product: "megasteelar",
      affiliate: "KML",
      publisher: "4g24l2j7euap00n4",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso17.mp3",
    fallbackDuration: 7,
    transcript: [
      { speaker: "Asesor", text: "Sra. Susana, en su localidad no disponemos de cobranza contra entrega en efectivo, únicamente pago previo con tarjeta." },
      { speaker: "Cliente", text: "Ah no, yo no uso bancos ni tarjetas de crédito, solo me manejo con billete en mano. Así que no puedo comprarlo." }
    ],
    expected: {
      category: "CONTACTO",
      subcategory: "RECHAZO_SOLO_PAGO_TC",
      agendaPhone: null
    },
    explanation: "Zonas con cobro exclusivo por tarjeta donde el cliente no posee plástico: CONTACTO + rechazo, Solo pago con TC."
  },

  // 18. CONTACTO: Rechazo, solo quiere 1 unidad
  {
    id: 18,
    title: "Cliente insiste en comprar solo 1 frasco cuando se vende por pack",
    lead: {
      id: "5642290",
      db: "9 - Base Activa ARgentina 2023 segunda mitad",
      name: "Héctor",
      lastName: "Ceballos",
      phone: "02644221199",
      phone2: "",
      dni: "20441987",
      email: "",
      product: "hondrodox",
      affiliate: "Weinlol",
      publisher: "rain",
      country: "ARGENTINA"
    },
    audioSrc: "assets/audio/caso18.mp3",
    fallbackDuration: 6,
    transcript: [
      { speaker: "Asesor", text: "Don Héctor, este producto viene exclusivamente en tratamiento promocional de 2 o 3 unidades..." },
      { speaker: "Cliente", text: "Yo no quiero tratamiento largo, mándeme 1 solo frasco para probar. Si no me vende 1 solo frasco, no le compro nada." }
    ],
    expected: {
      category: "CONTACTO",
      subcategory: "RECHAZO_SOLO_UNA_UNIDAD",
      agendaPhone: null
    },
    explanation: "Cuando el producto no se fracciona por unidad y el cliente insiste en llevar solo uno: CONTACTO + Rechazo, solo quiere 1 unidad."
  }
];