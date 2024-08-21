import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function Home() {
  const { userId } = auth();
  let href = userId ? '/journal' : '/new-user';

  // * FIXME: Refactor header component * //

  return (
    <>
      <SignedIn>
        <header className="h-[80px] border-b border-white bg-black w-full px-12 flex items-center justify-end">
          <div className="text-sm text-white font-bold hover:underline hover:text-black hover:bg-white border hover:border-black bg-black p-3 rounded-md">
            <SignOutButton redirectUrl="/" />
          </div>
          {/* <UserButton /> */}
        </header>
      </SignedIn>
      <div className="w-screen h-screen bg-black flex flex-col justify-center items-center text-white">
        <div className="w-full max-w-[600px] mx-auto">
          <h1 className="text-6xl mb-4">MindState</h1>
          <p className="text-2xl text-white/60 mb-4">
            AI powered app to track your mood and improve your life.
          </p>
          <div>
            <Link href={href}>
              <button className="bg-blue-700 text-blue-200 border border-white rounded-md text-xl p-3 hover:bg-black hover:text-blue-700 hover:border-blue-700">
                <SignedIn>home</SignedIn>
                <SignedOut>get started</SignedOut>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
