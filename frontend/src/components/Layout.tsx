import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-4 pt-20">{children}</main>
    </>
  );
}
