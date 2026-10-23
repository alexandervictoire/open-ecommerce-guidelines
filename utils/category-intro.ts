// What each category page says before the list of guidelines.
//
// The category pages rank for the definition question — "what is a PDP",
// "plp meaning ecommerce" — but used to open straight into the guideline list,
// so they never answered it. Each page now leads with the question as an H2 and
// answers it in one paragraph, and says the same thing three times over in
// three places that have to agree: the visible text, the meta description and
// the `DefinedTerm` in the structured data.
//
// Keep `description` at 155 characters or less, which is where search results
// start truncating, and keep it opening with the definition itself.

export interface CategoryIntro {
  /** The page's H1, which the <title> repeats word for word. */
  heading: string
  /** The definition question, rendered as the first H2. */
  question: string
  /** The answer, one paragraph. */
  definition: string
  /** One sentence leading into the list below. */
  bridge: string
  /** Shortened definition for the meta description (<= 155 characters). */
  description: string
  /** Spelled-out name for the DefinedTerm in the structured data. */
  termName: string
  /** The abbreviation, where the term has one. */
  termAbbreviation?: string
}

export const CATEGORY_INTROS: Record<string, CategoryIntro> = {
  plp: {
    heading: 'Product Listing Page (PLP) guidelines',
    question: 'What is a product listing page (PLP)?',
    definition:
      'A product listing page (PLP) is the page in an online shop that shows several products at once, usually a category or search result, with filters and sorting. Its job is to help shoppers decide which product to look at.',
    bridge:
      'The guidelines below describe what a good PLP needs, for shoppers, search engines and AI agents.',
    description:
      'A product listing page (PLP) shows several products at once, usually a category or search result, with filters and sorting.',
    termName: 'Product listing page',
    termAbbreviation: 'PLP'
  },
  pdp: {
    heading: 'Product Detail Page (PDP) guidelines',
    question: 'What is a product detail page (PDP)?',
    definition:
      'A product detail page (PDP) is the page in an online shop that presents a single product: images, price, variants, availability and the button to add it to the cart. It is where most purchase decisions are made.',
    bridge:
      'The guidelines below describe what a good PDP needs, for shoppers, search engines and AI agents.',
    description:
      'A product detail page (PDP) presents a single product: images, price, variants, availability and the button to add it to the cart.',
    termName: 'Product detail page',
    termAbbreviation: 'PDP'
  },
  cart: {
    heading: 'Cart guidelines',
    question: 'What is the cart in e-commerce?',
    definition:
      'The cart is where shoppers review what they have chosen before checkout: products, quantities, discounts and the total including shipping.',
    bridge:
      'The guidelines below describe what a good cart needs, for shoppers, search engines and AI agents.',
    description:
      'The cart is where shoppers review what they have chosen before checkout: products, quantities, discounts and the total including shipping.',
    termName: 'Shopping cart',
    termAbbreviation: 'Cart'
  },
  checkout: {
    heading: 'Checkout guidelines',
    question: 'What is the checkout in e-commerce?',
    definition:
      'The checkout is the sequence of steps in which a shopper enters address, shipping and payment details and places the order.',
    bridge:
      'The guidelines below describe what a good checkout needs, for shoppers, search engines and AI agents.',
    description:
      'The checkout is the sequence of steps in which a shopper enters address, shipping and payment details and places the order.',
    termName: 'Checkout'
  },
  global: {
    heading: 'Global guidelines',
    question: 'What are global guidelines?',
    definition:
      'Global guidelines apply to every page of a shop, such as navigation, consent and trust signals.',
    bridge:
      'The guidelines below describe what every page of a shop needs, for shoppers, search engines and AI agents.',
    description:
      'Global guidelines apply to every page of a shop, such as navigation, consent and trust signals.',
    termName: 'Global guidelines'
  }
}

export function categoryIntro(category: string): CategoryIntro | null {
  return CATEGORY_INTROS[category] ?? null
}
