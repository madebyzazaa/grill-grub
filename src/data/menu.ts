export type Category = 'Grill Boxes' | 'Rice & Plantain' | 'Breakfast Boxes' | 'Shawarma & Sides' | 'Shakes';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  description: string;
}

export interface CartLine extends MenuItem {
  qty: number;
}

const image = (name: string) => `/images/${name}`;

export const MENU: MenuItem[] = [
  {
    id: 'port-harcourt-grill-box',
    name: 'Port Harcourt Grill Box',
    price: 6500,
    image: image('Screenshot_2026-08-07_233051.png'),
    category: 'Grill Boxes',
    description: 'A generous mix of grilled chicken, beef, smoky sides and our signature sauce.',
  },
  {
    id: 'suya-chicken-combo',
    name: 'Suya Chicken Combo',
    price: 5500,
    image: image('Screenshot_2026-08-07_234434.png'),
    category: 'Grill Boxes',
    description: 'Charred chicken, a grilled bun and creamy loaded side, finished with suya spice.',
  },
  {
    id: 'peppered-wings-box',
    name: 'Peppered Wings Box',
    price: 4800,
    image: image('Screenshot_2026-08-07_233051.png'),
    category: 'Grill Boxes',
    description: 'Sticky, peppered chicken wings served hot with a smoky grilled mini bun.',
  },
  {
    id: 'jollof-plantain-feast',
    name: 'Jollof & Plantain Feast',
    price: 6000,
    image: image('Screenshot_2026-08-07_233127.png'),
    category: 'Rice & Plantain',
    description: 'Party jollof rice, sweet fried plantain and tender seasoned chicken in one box.',
  },
  {
    id: 'plantain-chicken-bowl',
    name: 'Plantain Chicken Bowl',
    price: 5200,
    image: image('Screenshot_2026-08-07_233127.png'),
    category: 'Rice & Plantain',
    description: 'Golden plantain over rich spiced rice with juicy chicken and a savoury glaze.',
  },
  {
    id: 'pancake-box',
    name: 'Pancake Breakfast Box',
    price: 4500,
    image: image('Screenshot_2026-08-07_233144.png'),
    category: 'Breakfast Boxes',
    description: 'Soft pancakes with baked beans, scrambled eggs and a side of grilled sausage.',
  },
  {
    id: 'sausage-special',
    name: 'Sausage Special',
    price: 4200,
    image: image('Screenshot_2026-08-07_233144.png'),
    category: 'Breakfast Boxes',
    description: 'Grilled sausages, fluffy pancakes, eggs and beans for a proper Port Harcourt start.',
  },
  {
    id: 'grilled-beef-bun',
    name: 'Grilled Beef Bun',
    price: 5000,
    image: image('Screenshot_2026-08-07_234434.png'),
    category: 'Shawarma & Sides',
    description: 'Seasoned grilled beef tucked into a toasted bun with creamy, peppery toppings.',
  },
  {
    id: 'creamy-chicken-bake',
    name: 'Creamy Chicken Bake',
    price: 4800,
    image: image('Screenshot_2026-08-07_234845.png'),
    category: 'Shawarma & Sides',
    description: 'Tender chicken baked in a creamy savoury sauce and finished with a sweet heat drizzle.',
  },
  {
    id: 'signature-sauce-tray',
    name: 'Signature Sauce Tray',
    price: 3800,
    image: image('Screenshot_2026-08-07_234845.png'),
    category: 'Shawarma & Sides',
    description: 'Our rich baked special with herbs, house sauce and a satisfying golden finish.',
  },
  {
    id: 'banana-bliss-smoothie',
    name: 'Banana Bliss Smoothie',
    price: 3500,
    image: image('Screenshot_2026-08-07_234720.png'),
    category: 'Shakes',
    description: 'A thick, creamy banana smoothie blended smooth and served ice cold.',
  },
  {
    id: 'oreo-crunch-shake',
    name: 'Oreo Crunch Shake',
    price: 4000,
    image: image('Screenshot_2026-08-07_234736.png'),
    category: 'Shakes',
    description: 'Creamy cookie shake with rich chocolate swirls and a full Oreo finish.',
  },
  {
    id: 'classic-boba-cream',
    name: 'Classic Boba Cream',
    price: 4200,
    image: image('Screenshot_2026-08-07_234759.png'),
    category: 'Shakes',
    description: 'Silky vanilla cream shake with chewy pearls and Grill & Rub boba flair.',
  },
  {
    id: 'strawberry-boba-swirl',
    name: 'Strawberry Boba Swirl',
    price: 4500,
    image: image('Screenshot_2026-08-07_234759.png'),
    category: 'Shakes',
    description: 'A cool strawberry cream shake with a sweet pink swirl and boba pearls.',
  },
  {
    id: 'mango-boba-dream',
    name: 'Mango Boba Dream',
    price: 4500,
    image: image('Screenshot_2026-08-07_234759.png'),
    category: 'Shakes',
    description: 'Tropical mango shake with creamy texture, fruit ribbons and chewy boba.',
  },
];

export const CATEGORIES: Category[] = ['Grill Boxes', 'Rice & Plantain', 'Breakfast Boxes', 'Shawarma & Sides', 'Shakes'];

export const DELIVERY_FEE = 1000;
export const WHATSAPP_NUMBER = '2348148296284';

export function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG');
}
