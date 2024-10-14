import Link from "next/link";

export default function NavItems() {
  return (
    <>
      <Link href="#" className="text-gray-700 text-sm font-bold py-2 px-4 rounded font-jakarta">
        AI Headshots
      </Link>
      <Link href="#" className="text-gray-700 text-sm font-bold py-2 px-4 rounded font-jakarta">
        Testimonial
      </Link>
      <Link href="#" className="text-gray-700 text-sm font-bold py-2 px-4 rounded font-jakarta">
        Pricing
      </Link>
      <Link href="#" className="text-gray-700 text-sm font-bold py-2 px-4 rounded font-jakarta">
        FAQ
      </Link>
    </>
  );
}
