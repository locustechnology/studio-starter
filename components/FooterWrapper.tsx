'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return <Footer />;
  }
  return null;
}
