'use client';

import { GoogleLogo } from '@/assets';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SignUpForm from '../../Forms/SignUpForm/SignUpForm';
import { Button, buttonVariants } from '../../Inputs/Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../Base';

export interface CardHeader {
  title: string;
  description: string;
}

const cardHeaders: { [k: string]: CardHeader } = {
  authMethod: {
    title: 'Welcome to Estimax',
    description: 'Choose how you want to authenticate',
  },
  basicInfo: {
    title: 'Sign up with Email',
    description: 'Please enter some basic info to continue.',
  },
  verifyEmail: {
    title: 'Verify your Email',
    description: 'Please check your email for a code to verify your account.',
  },
};

export default function SignUpCard() {
  const searchParams = useSearchParams();
  const withEmail = searchParams.get('withEmail');
  const [cardHeader, setCardHeader] = useState<CardHeader>(
    cardHeaders.basicInfo
  );

  useEffect(() => {
    if (withEmail) {
      setCardHeader(cardHeaders.basicInfo);
    } else {
      setCardHeader(cardHeaders.authMethod);
    }
  }, [withEmail]);

  return (
    <Card className="w-[24rem]" withShadow>
      <CardHeader>
        <CardTitle className="text-lg">{cardHeader.title}</CardTitle>
        <CardDescription>{cardHeader.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!withEmail && (
          <>
            <Button className="w-full" variant="secondary">
              <GoogleLogo className="h-4 w-4 fill-dark-grey" />
              Sign up with Google
            </Button>
            <Link
              href="/auth/signup?withEmail=true"
              className={`${buttonVariants({
                variant: 'secondary',
              })} mt-4 w-full`}
            >
              <EnvelopeClosedIcon className="path-2 h-4 w-4" />
              Sign up with Email
            </Link>
          </>
        )}
        {withEmail && (
          <SignUpForm
            setCardHeader={(key: string) => setCardHeader(cardHeaders[key])}
          />
        )}
      </CardContent>
    </Card>
  );
}
