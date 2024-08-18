import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">MindState</h1>
        <p className="text-2xl text-white/60 mb-4">
          AI powered app to track your mood and improve your life.
        </p>
        <div>
          <Link href="/journal">
            <button className="bg-blue-700 text-blue-200 border border-white rounded-md text-xl p-3 hover:bg-black hover:text-blue-700 hover:border-blue-700">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
