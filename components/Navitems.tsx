import Link from "next/link";

export default function NavItems({ isMobile = false }) {
  const linkClass = `text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300 ${
    isMobile ? 'block py-2' : ''
  }`;

  return (
    <>
      <Link href="/" className={linkClass}>
        AI Product Photos
      </Link>
      <Link href="/#testimonial" className={linkClass}>
        Testimonial
      </Link>
      <Link href="/#pricing" className={linkClass}>
        Pricing
      </Link>
      <Link href="/#faq" className={linkClass}>
        FAQ
      </Link>
    </>
  );
}
