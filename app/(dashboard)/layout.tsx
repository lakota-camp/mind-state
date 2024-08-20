import { SignedIn, SignOutButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative ">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10 text-center py-4 text-xl">
        Mood
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10 w-full px-12 py-12 flex items-center justify-between">
          <div className="text-2xl font-bold hover:underline hover:text-black/60">
            <Link href="/journal">MindState</Link>
          </div>
          <SignedIn>
            <div className="text-sm text-white font-bold hover:underline hover:text-black hover:bg-white border hover:border-black bg-black p-3 rounded-md">
              <SignOutButton redirectUrl="/" />
            </div>
          </SignedIn>
          {/* <UserButton /> */}
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
