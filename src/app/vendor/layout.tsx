'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import {
  LuBell,
  LuCoins,
  LuHammer,
  LuInbox,
  LuLayoutDashboard,
  LuShoppingBag,
} from 'react-icons/lu';
import ProfileDropdown from '../components/DropdownMenu/ProfileDropdown/ProfileDropdown';
import { buttonVariants } from '../components/Inputs/Button/Button';
import NavBar from '../components/NavBar/NavBar';

interface LinkItemProps {
  href: string;
  text: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const LinkItem = ({ href, text, Icon }: LinkItemProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname.startsWith(href) && href !== '/vendor');

  return (
    <Link
      href={href}
      className={`input-focus flex flex-row items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-grey-600 transition-all ${
        isActive ? 'bg-grey-100 text-grey-700' : 'hover:bg-grey-100'
      }`}
    >
      {/* {Icon && <Icon className="h-4 w-4" />} */}
      {text}
    </Link>
  );
};

const NavLinks = () => {
  return (
    <div className="flex flex-row gap-4">
      <LinkItem href="/vendor" text={'Dashboard'} Icon={LuLayoutDashboard} />
      <LinkItem href="/vendor/projects" text={'Projects'} Icon={LuHammer} />
      <LinkItem href="/vendor/quotes" text={'Quote Manager'} Icon={LuCoins} />
    </div>
  );
};

export default function VendorLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen flex-col bg-grey-25">
      <NavBar
        leftChild={
          <div className="flex flex-row items-center gap-8">
            <p className="font-semibold">Estimax</p>
            <NavLinks />
          </div>
        }
        rightChild={
          <div className="flex flex-row items-center gap-6">
            <Link
              href="/vendor/projects/find"
              className={cn(buttonVariants({ variant: 'tertiary' }))}
            >
              <LuShoppingBag />
            </Link>
            <div className="h-5 w-px bg-grey-300" />
            <LuBell />
            <LuInbox />
            <ProfileDropdown />
          </div>
        }
      />
      <main className="p-10">{children}</main>
    </div>
  );
}
