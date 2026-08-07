import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MenuGrid } from '@/components/MenuGrid';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { FloatingCart } from '@/components/FloatingCart';
import { MENU } from '@/data/menu';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-ink-950 text-white">
        <Header onCartClick={() => setCartOpen(true)} />
        <main>
          <Hero />
          <MenuGrid items={MENU} />
          <Features />
        </main>
        <Footer />

        <FloatingCart onClick={() => setCartOpen(true)} />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </CartProvider>
  );
}

export default App;
