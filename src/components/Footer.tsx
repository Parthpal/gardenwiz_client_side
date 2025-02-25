import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-3 items-center justify-center bg-green-900 text-white py-6 text-center">
        <p className="text-sm">© 2025 Gardening Tips & Advice Platform | All rights reserved.</p>
        <Link href={'/AboutUs'}>About us</Link>
        <Link href={'/ContactUs'}>Contact us</Link>
      </div>
    );
};

export default Footer;