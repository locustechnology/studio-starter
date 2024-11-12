import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import final_Logo from "@/public/new-logo.png";

interface FooterColumnProps {
  title: string;
  items: (string | JSX.Element)[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, items }) => (
  <div className="mb-6 sm:mb-0">
    <h3 className="font-semibold text-sm mb-4 font-jakarta">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index}>
          {typeof item === 'string' ? (
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              {item}
            </Link>
          ) : (
            <span className="text-sm text-gray-600 hover:text-gray-900">
              {item}
            </span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const columns: FooterColumnProps[] = [
    {
      title: 'Features',
      items: ['AI Product Photos']
    },
    {
      title: 'Resources',
      items: ['Pricing']
    },
    {
      title: 'Company',
      items: [
        <a href="mailto:hello@gostudio.ai">Contact Us</a>
      ]
    },
    {
      title: 'Legal',
      items: ['Terms Policy', 'Privacy Policy']
    }
  ];

  return (
    <footer className="w-full bg-white mt-4 font-poppins">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center mb-4">
                <Image src={final_Logo} alt="Studio.ai logo" width={320} height={120} className="rounded-full" style={{ padding: '14.12px 11.3px', gap: '4.16px' }} />
              </div>
              <p className="text-xs text-gray-500 max-w-xs leading-tight">
                Premium Product Photography, Simplified
                <br />
                Transform your products with studio-quality professional photos without the studio price. Our AI delivers pristine 4K product shots within the hour, starting at just $29.
              </p>
            </div>
            <div className="col-span-1 lg:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {columns.map((column) => (
                  <FooterColumn key={column.title} {...column} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 sm:mb-0">
              Copyright© 2024 <Link href="/" className="text-blue-600 hover:underline">GoStudio.ai</Link>
            </p>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-4">Need help?</span>
              <a href="mailto:hello@gostudio.ai" className="text-sm text-blue-600 hover:underline">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;