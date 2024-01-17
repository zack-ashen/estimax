'use client';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/app/components/Inputs/Button/Button';
import NavBar from '@/app/components/NavBar/NavBar';
import Link from 'next/link';

const AuthButtons = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row space-x-2">
      {pathname === '/auth/signin' && (
        <Link
          href="/auth/signup"
          className={buttonVariants({ variant: 'secondary' })}
        >
          Sign Up
        </Link>
      )}
      {pathname === '/auth/signup' && (
        <Link
          href="/auth/signin"
          className={buttonVariants({ variant: 'secondary' })}
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <NavBar leftChild={<>Estimax</>} rightChild={<AuthButtons />} />
      <div className="dot-grid-background -z-10 bg-grey-50" />
      <main className="flex flex-grow items-center justify-center">
        {children}
      </main>
    </div>
  );
}
