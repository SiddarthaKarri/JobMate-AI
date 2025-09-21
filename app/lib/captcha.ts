import type { ImageSet } from "~/components/HumanCaptcha";

// Simple image URLs for captcha - using data URLs for basic shapes
const CIRCLE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzAiIGZpbGw9IiMzQjgyRjYiLz4KPC9zdmc+";

const SQUARE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNFRjQ0NDQiLz4KPC9zdmc+";

const TRIANGLE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBvbHlnb24gcG9pbnRzPSI0MCwxMCA3MCw2NSAxMCw2NSIgZmlsbD0iIzEwQjk4MSIvPgo8L3N2Zz4=";

const DIAMOND = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBvbHlnb24gcG9pbnRzPSI0MCwxMCA3MCw0MCA0MCw3MCAzMCw0MCIgZmlsbD0iI0Y1OUUwQiIvPgo8L3N2Zz4=";

const STAR = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBvbHlnb24gcG9pbnRzPSI0MCwxMCA0NiwzMCA2OCwyOCA1MiwzOCA1OCw2MCA0MCw0OCAyMiw2MCAyOCwzOCAxMiwyOCAzNCwzMCIgZmlsbD0iI0VGNDQ5NCIvPgo8L3N2Zz4=";

const HEXAGON = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBvbHlnb24gcG9pbnRzPSI0MCwxMCA2MCwyNSA2MCw1NSA0MCw3MCAyMCw1NSAyMCwyNSIgZmlsbD0iIzg4NTVGRiIvPgo8L3N2Zz4=";

// Predefined captcha image sets
export const CAPTCHA_IMAGE_SETS: ImageSet[] = [
  {
    images: [CIRCLE, CIRCLE, CIRCLE, SQUARE],
    oddIndex: 3, // Square is the odd one out
  },
  {
    images: [TRIANGLE, SQUARE, SQUARE, SQUARE],
    oddIndex: 0, // Triangle is the odd one out
  },
  {
    images: [DIAMOND, DIAMOND, STAR, DIAMOND],
    oddIndex: 2, // Star is the odd one out
  },
  {
    images: [HEXAGON, CIRCLE, CIRCLE, CIRCLE],
    oddIndex: 0, // Hexagon is the odd one out
  },
  {
    images: [STAR, STAR, TRIANGLE, STAR],
    oddIndex: 2, // Triangle is the odd one out
  },
];

export default CAPTCHA_IMAGE_SETS;