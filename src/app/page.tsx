import Link from 'next/link';
import { buttonVariants } from './components/Inputs/Button/Button';
import NavBar from './components/NavBar/NavBar';

export default function Home() {
  return (
    <>
      <NavBar
        leftChild={<>Estimax</>}
        rightChild={
          <div className="flex flex-row gap-10">
            <Link
              className={buttonVariants({ variant: 'secondary' })}
              href="/auth/signin"
            >
              Sign In
            </Link>
            <Link
              className={buttonVariants({ variant: 'primary' })}
              href="/auth/signup"
            >
              Get Started
            </Link>
          </div>
        }
      />
      <main className="relative mx-auto w-full px-10">
        <div className="background-blur -z-50" />
        <h1 className="mx-auto text-5xl font-semibold text-blue-800">
          Bid and vendor management simplified.
        </h1>
      </main>
    </>
  );
}
