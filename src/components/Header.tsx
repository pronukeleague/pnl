'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/WalletContextProvider';

// Dynamically import wallet button with no SSR to prevent hydration errors
const WalletButton = dynamic(
  () => import('./WalletButton'),
  { 
    ssr: false,
    loading: () => (
      <div className="bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 text-sm font-medium text-white animate-pulse">
        Loading...
      </div>
    )
  }
);

export default function Header() {
  const { user, loading } = useUser();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering user info after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-white border-b border-red-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                <Image
                  src="/logo.png"
                  alt="Pro Nuke League"
                  width={48}
                  height={48}
                  className="rounded-lg w-10 h-10 sm:w-12 sm:h-12"
                  priority
                />
                <span className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold" style={{ fontFamily: 'var(--font-pixelify)' }}>
                  <span className="text-red-600">P</span>
                  <span className="text-gray-900">ro </span>
                  <span className="text-red-600">N</span>
                  <span className="text-gray-900">uke </span>
                  <span className="text-red-600">L</span>
                  <span className="text-gray-900 hidden sm:inline">eague</span>
                  <span className="text-gray-900 sm:hidden hidden">eague</span>
                </span>
              </div>
            </Link>
          </div>

          {/* User Info and Connect Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            {mounted && user && !loading && (
              <div className="flex items-center gap-1.5 sm:gap-2 bg-red-50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={28}
                  height={28}
                  className="rounded-full w-6 h-6 sm:w-8 sm:h-8"
                />
                <span className="text-xs sm:text-sm font-medium text-gray-900 max-w-[60px] sm:max-w-none truncate">{user.name}</span>
              </div>
            )}
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
}