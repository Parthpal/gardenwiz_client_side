/* eslint-disable prettier/prettier */
import React from 'react';

export default function Container ({ children }: { children: React.ReactNode }) {
    return (
      <div className=" container mx-auto pt-16 max-w-7xl flex-grow px-6">
        <main>{children}</main>
      </div>
    );
  }