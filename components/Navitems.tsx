import Link from "next/link";

export default function NavItems() {
  return (
    <>
      <Link href="/" className="text-gray-700 font-bold text-lg py-2 px-6 rounded font-jakarta hover:bg-gray-100 transition duration-300">
        AI Headshots
      </Link>
      <Link href="/#testimonial" className="text-gray-700 font-bold text-lg py-2 px-6 rounded font-jakarta hover:bg-gray-100 transition duration-300">
        Testimonial
      </Link>
      <Link href="/#pricing" className="text-gray-700 font-bold text-lg py-2 px-6 rounded font-jakarta hover:bg-gray-100 transition duration-300">
        Pricing
      </Link>
      <Link href="/#faq" className="text-gray-700 font-bold text-lg py-2 px-6 rounded font-jakarta hover:bg-gray-100 transition duration-300">
        FAQ
      </Link>
    </>
  );
}
