import dynamic from 'next/dynamic';

// Dynamically load the client-side Cart component (no SSR)
const CartClient = dynamic(() => import('./CartClient'), { ssr: false });

export default function CartPage() {
  return <CartClient />;
}
