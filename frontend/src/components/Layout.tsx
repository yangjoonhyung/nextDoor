/* eslint-disable prettier/prettier */
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-8 pt-20">
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
