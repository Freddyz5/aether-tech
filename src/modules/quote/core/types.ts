/*
  Forma de los datos que consume el módulo. En el original esto era la forma
  DESPUÉS de aplanar el idioma con separateLanguages; aquí quote.json ya se
  escribe directamente así porque el sitio es monolingüe (español) — no hay
  paso de aplanado.
*/

export interface UnitLabels {
  singular: string;
  plural: string;
}

/** Pieza que se marca o no. */
export interface ToggleItem {
  kind: 'toggle';
  id: string;
  name: string;
  price: number;
  initial: boolean;
  description: string;
  /** Frase que se añade a la descripción según la opción elegida en un grupo. */
  variants?: Record<string, string>;
  requires?: string;
  /** Etiqueta de referencia tipo "U1" — puramente cosmética, viene del diseño. */
  tag?: string;
}

/** Pieza de cantidad variable: secciones extra, horas de soporte. */
export interface CounterItem {
  kind: 'counter';
  id: string;
  name: string;
  pricePerUnit: number;
  initial: number;
  min: number;
  max: number;
  unit: UnitLabels;
  description: string;
  requires?: string;
  tag?: string;
}

export interface ChoiceOption {
  id: string;
  name: string;
  price: number;
  description: string;
  recommended?: boolean;
  tag?: string;
}

/** Grupo excluyente: hay que elegir una de las alternativas. */
export interface ChoiceGroup {
  kind: 'choice';
  id: string;
  question: string;
  initial: string;
  options: ChoiceOption[];
  requires?: string;
}

export type QuoteItem = ToggleItem | CounterItem | ChoiceGroup;

export interface Phase {
  id: string;
  name: string;
  note?: string;
  items: QuoteItem[];
}

/** Procedencia de las cifras. No se usa en el cálculo: está para que dentro de
    seis meses se sepa de qué hoja salieron y cuándo se actualizó. */
export interface PricingSource {
  source: string;
  anchorHourly: number;
  updated: string;
}

export interface QuoteSettings {
  /*
    No hay tarifa horaria en el cálculo a propósito. La hoja de tarifas fija el
    precio por el valor entregado, no por las horas de producción: cada pieza
    trae su precio ya cerrado y el total es una suma, no una multiplicación.
  */
  pricing: PricingSource;
  validityDays: number;
  quotePrefix: string;
  preparedBy: string;
  client: string;
  subject: string;
}

export interface QuoteData {
  meta: { title: string; description: string };
  settings: QuoteSettings;
  phases: Phase[];
  recurringCosts: string[];
  notIncluded: string[];
  ui: Record<string, string>;
}

/*
  El estado. Objetos planos y no Map a propósito: así la selección se serializa
  a la URL y se vuelca al DOM sin conversiones intermedias.
*/
export interface Selection {
  toggles: Record<string, boolean>;
  counters: Record<string, number>;
  choices: Record<string, string>;
}

export interface QuoteLine {
  id: string;
  phaseId: string;
  name: string;
  quantity: number;
  amount: number;
}

export interface PhaseTotal {
  phaseId: string;
  amount: number;
  lines: QuoteLine[];
}

export interface QuoteResult {
  lines: QuoteLine[];
  byPhase: PhaseTotal[];
  totalAmount: number;
  partCount: number;
  /** id → su requisito está satisfecho. Incluye piezas, grupos y opciones. */
  available: Record<string, boolean>;
  /** Opciones que además de elegidas están contando (su grupo no está bloqueado). */
  activeOptions: string[];
}
