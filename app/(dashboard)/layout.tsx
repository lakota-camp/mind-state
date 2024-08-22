import Link from 'next/link';
import { SignedIn, SignOutButton, UserButton } from '@clerk/nextjs';
import { LuBrainCircuit } from 'react-icons/lu';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Home, LineChart, Package, Settings, BookOpen } from 'lucide-react';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/journal', label: 'Journal', icon: BookOpen },
  { href: '/history', label: 'History', icon: LineChart },
];

const DashboardLayout = ({ children }) => {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-10 w-16 flex flex-col items-center border-r bg-background py-4">
          <nav className="flex flex-col items-center gap-4 mt-12">
            {links.map((link) => (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="p-4 bg-black text-white rounded-md text-md font-semibold">
                    {link.label}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="ml-16 flex-1">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between bg-background px-6 ">
            <div className="flex items-center text-2xl font-bold">
              <Link
                href="/journal"
                className="flex items-center hover:underline"
              >
                <LuBrainCircuit className="mr-2" />
                MindState
              </Link>
            </div>
            <SignedIn>
              <div className="text-sm text-white font-bold hover:underline hover:text-black hover:bg-white border hover:border-black bg-black p-3 rounded-md">
                <SignOutButton redirectUrl="/" />
              </div>
            </SignedIn>
            {/* Uncomment to add user button */}
            {/* <UserButton /> */}
          </header>

          <main className="h-[calc(100vh-64px)] p-6">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DashboardLayout;
