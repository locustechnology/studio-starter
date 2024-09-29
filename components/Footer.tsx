import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "/public/98.png";

interface FooterColumnProps {
  title: string;
  items: string[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, items }) => (
  <div className="mb-4 sm:mb-0">
    <h3 className="font-semibold text-sm mb-2">{title}</h3>
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item}>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const columns: FooterColumnProps[] = [
    {
      title: 'Features',
      items: ['AI Headshot Generator']
    },
    {
      title: 'Resources',
      items: ['Support', 'Pricing']
    },
    {
      title: 'Company',
      items: ['About Us', 'Contact Us']
    },
    {
      title: 'Legal',
      items: ['Terms & Conditions', 'Refund Policy', 'Privacy Policy']
    }
  ];

  return (
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image src={logo} alt="Studio.ai logo" width={24} height={24} className="rounded-sm" />
              <span className="text-xl font-bold ml-2">Studio.ai</span>
            </Link>
          </div>
          <div className="text-sm text-gray-600 max-w-md">
            Professional AI Headshots in 4K quality.
            <br />
            Get your headshot in under 60 minutes, no photographer needed. Starting from $29.
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {columns.map((column) => (
            <FooterColumn key={column.title} {...column} />
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <p className="mb-2 sm:mb-0">
            Copyright© 2024 <Link href="/" className="text-blue-500 hover:text-blue-600">Gostudio.ai</Link>
          </p>
          <p>
            Need help? <Link href="/" className="text-[#5B16FE] hover:text-blue-600">Contact Us</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;