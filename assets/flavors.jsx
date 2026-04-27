// Product data. Shape mirrors Shopify's product/variant model so this maps
// 1:1 when the site is ported to a Shopify theme: swap variantId placeholders
// for real Shopify variant IDs, and the forms/AJAX calls already work.
const SHOPIFY_DOMAIN = 'REPLACE_WITH_YOUR_SHOP.myshopify.com'; // used for JSON-LD
function formatMoney(cents) {
  return '$' + (cents / 100).toFixed(2);
}
window.formatMoney = formatMoney;
window.SHOPIFY_DOMAIN = SHOPIFY_DOMAIN;

const FLAVORS = [
  {
    id: 'mocha',
    handle: 'mocha-crisp',
    sku: 'BOLD-MOCHA-12',
    variantId: 'REPLACE_WITH_SHOPIFY_VARIANT_MOCHA',
    price: 400,          // cents — Shopify convention
    comparePrice: null,
    inventory: 1240,
    rating: 4.9,
    reviewCount: 612,
    name: 'Mocha Crisp',
    tagline: 'Espresso hits. Crisp bite.',
    wrapper:  '#1a1a1c',          // card surface (dark for silver contrast)
    wrapper2: '#0f0f11',          // deep fold
    paper:    '#EEEBE3',          // warm off-white page bg
    ink:      '#1a1a1c',          // dark text
    accent:   '#DC443A',          // wrapper red
    accent2:  '#ED6A5C',
    img: 'assets/img/bar-mocha.png',
    desc: 'Cold-brew intensity baked into a chocolate-crisp bar. For the 2pm wall.',
    ingredients: ['Milk Protein Isolate', 'Cold-brew Coffee', 'Cocoa', 'Crisped Rice', 'Honey', 'Sea Salt'],
    macros: { protein: 20, caffeine: 100, sugar: 6, cals: 230 },
    hex: 'DC443A',
  },
  {
    id: 'pb',
    handle: 'peanut-butter',
    sku: 'BOLD-PB-12',
    variantId: 'REPLACE_WITH_SHOPIFY_VARIANT_PB',
    price: 400,
    comparePrice: null,
    inventory: 812,
    rating: 4.8,
    reviewCount: 441,
    name: 'Peanut Butter',
    tagline: 'Nutty. Chewy. Loaded.',
    wrapper:  '#1a1a1c',
    wrapper2: '#0f0f11',
    paper:    '#EEEBE3',
    ink:      '#1a1a1c',
    accent:   '#E97836',          // wrapper orange
    accent2:  '#EF9560',
    img: 'assets/img/bar-pb.png',
    desc: 'Real roasted peanut butter, honey, and a stealth caffeine jab. The cult favorite.',
    ingredients: ['Milk Protein Isolate', 'Roasted Peanut Butter', 'Honey', 'Oats', 'Green Coffee Extract', 'Sea Salt'],
    macros: { protein: 20, caffeine: 100, sugar: 7, cals: 240 },
    hex: 'E97836',
  },
  {
    id: 'cc',
    handle: 'cookie-dough',
    sku: 'BOLD-CD-12',
    variantId: 'REPLACE_WITH_SHOPIFY_VARIANT_CC',
    price: 400,
    comparePrice: null,
    inventory: 48, // low-stock
    rating: 4.9,
    reviewCount: 287,
    name: 'Cookie Dough',
    tagline: 'Cookie dough, weaponized.',
    wrapper:  '#1a1a1c',
    wrapper2: '#0f0f11',
    paper:    '#EEEBE3',
    ink:      '#1a1a1c',
    accent:   '#E8CC3B',          // wrapper yellow
    accent2:  '#F2DE66',
    img: 'assets/img/bar-cc.png',
    desc: 'Soft-baked vanilla dough, dark chocolate chunks, 100mg clean caffeine.',
    ingredients: ['Milk Protein Isolate', 'Dark Chocolate Chunks', 'Vanilla', 'Cashew Butter', 'Honey', 'Sea Salt'],
    macros: { protein: 20, caffeine: 100, sugar: 6, cals: 235 },
    hex: 'E8CC3B',
  },
];

window.FLAVORS = FLAVORS;
