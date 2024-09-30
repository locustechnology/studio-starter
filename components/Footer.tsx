import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "/public/98.png";

interface FooterColumnProps {
  title: string;
  items: string[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, items }) => (
  <div className="mb-8">
    <h3 className="font-semibold text-sm mb-4">{title}</h3>
    <ul className="space-y-3">
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
    <footer className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto xl:max-w-[1440px]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start mb-16">
          <div className="mb-12 lg:mb-0">
            <div className="flex items-center mb-6">
              <Image src={logo} alt="Studio.ai logo" width={40} height={40} className="rounded-full" />
              <span className="text-xl font-bold ml-2">Studio.ai</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Professional AI Headshots in 4K quality.
              <br />
              Get your headshot in under 60 minutes, no photographer needed. Starting from $29.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-0 w-full lg:w-auto">
            {columns.map((column) => (
              <FooterColumn key={column.title} {...column} />
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 sm:mb-0">
            Copyright© 2024 <Link href="/" className="text-[#5B16FE] hover:text-blue-600">Gostudio.ai</Link>
          </p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-4">Need help?</span>
            <Link href="/" className="text-sm text-[#5B16FE] hover:text-blue-600">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;