// js/categories.js
// Catálogo oficial según tabla operativa de campaña

export const CATEGORIES_DATA = {
  RELLAMAR: {
    label: "RELLAMAR",
    subcategories: [
      { id: "LLAMAR", label: "LLAMAR", requiresAgendaPhone: true },
      { id: "CONTESTADOR", label: "Contestador", requiresAgendaPhone: true }
    ]
  },
  NO_CONTACTO: {
    label: "NO CONTACTO",
    subcategories: [
      { id: "BASURA_NUM_EQUIVOCADO", label: "Basura, Numero equivocado", requiresAgendaPhone: false },
      { id: "BASURA_DATO_CRUZADO", label: "Basura ,Dato cruzado", requiresAgendaPhone: false },
      { id: "BASURA_SIN_STOCK", label: "Basura , producto SIN STOCK", requiresAgendaPhone: false },
      { id: "BASURA_DESCONOCE", label: "Basura Desconoce contacto", requiresAgendaPhone: false },
      { id: "BASURA_YA_COMPRO", label: "Basura Reclamo ya compro", requiresAgendaPhone: false },
      { id: "BASURA_FUERA_COBERTURA", label: "Basura fuera de cobertura", requiresAgendaPhone: false }
    ]
  },
  CONTACTO: {
    label: "CONTACTO",
    subcategories: [
      // Venta única de Argentina
      { id: "VENTA_CONFIRMADA", label: "Venta Confirmada", requiresAgendaPhone: false },
      // Motivos de Rechazo oficiales
      { id: "RECHAZO_SIN_DINERO", label: "Rechazo, No cta con dinero", requiresAgendaPhone: false },
      { id: "RECHAZO_COSTO_DIFIERE", label: "Rechazo, Costo del producto difiere con publicación", requiresAgendaPhone: false },
      { id: "RECHAZO_PROBLEMAS_TC", label: "Rechazo, Problemas con TC", requiresAgendaPhone: false },
      { id: "RECHAZO_CORTA_DISCONFORME", label: "Rechazo, cliente corta disconforme", requiresAgendaPhone: false },
      { id: "RECHAZO_PLAZOS_ENVIO", label: "Rechazo, No conforme con plazos e envio", requiresAgendaPhone: false },
      { id: "RECHAZO_DATOS_TC", label: "Rechazo, No conforme con brindar datos de TC", requiresAgendaPhone: false },
      { id: "RECHAZO_PRODUCTO", label: "Rechazo, No conforme con Producto", requiresAgendaPhone: false },
      { id: "RECHAZO_SOLO_PAGO_TC", label: "rechazo, Solo pago con TC", requiresAgendaPhone: false },
      { id: "RECHAZO_QR", label: "Rechazo, QR", requiresAgendaPhone: false },
      { id: "RECHAZO_SOLO_UNA_UNIDAD", label: "Rechazo, solo quiere 1 unidad", requiresAgendaPhone: false },
      { id: "RECHAZO_NO_APRUEBA_TC", label: "Rechazo, no aprueba validacion TC", requiresAgendaPhone: false }
    ]
  }
};