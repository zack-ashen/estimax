'use client';
import EnvelopeIcon from '@/assets/envelope.svg';
import { ClerkAPIError } from '@/types';
import { useSignUp } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../Inputs/Button/Button';
import { Label } from '../../Inputs/Label/Label';
import { TextInput } from '../../Inputs/TextInput/TextInput';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../Base/Form/Form';
import VerifyEmailForm from '../VerifyEmailForm/VerifyEmailForm';

const schema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof schema>;

const defaultValues: DefaultValues<SignUpSchema> = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

interface SignUpFormProps {
  setCardHeader: (key: string) => void;
}

export default function SignUpForm({ setCardHeader }: SignUpFormProps) {
  const [pendingVerification, setPendingVerification] = useState(false);
  const form = useForm<SignUpSchema>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const {
    formState: { errors },
  } = form;
  const { isLoaded, signUp, setActive } = useSignUp();

  if (!isLoaded) return null;

  const submit = async (data: SignUpSchema) => {
    try {
      await signUp.create({
        emailAddress: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setCardHeader('verifyEmail');
      setPendingVerification(true);
    } catch (err: any) {
      if (err.clerkError) {
        const clerkErrors: ClerkAPIError[] = err.errors;
        clerkErrors.forEach((clerkErr) => {
          switch (clerkErr.code) {
            case 'form_identifier_exists':
              form.setError('email', {
                type: 'manual',
                message: 'That email address already exists.',
              });
              break;
            default:
              console.error(JSON.stringify(clerkErr, null, 2));
              break;
          }
        });
      } else {
        console.error(JSON.stringify(err, null, 2));
      }
    }
  };

  const signUpWithGoogle = () => {
    if (!isLoaded) return null;
    signUp.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/auth/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  return (
    <>
      {!pendingVerification && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <div className="form-elements">
              <div className="flex flex-row gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="firstName" isRequired>
                        First Name
                      </Label>
                      <FormControl>
                        <TextInput
                          autoComplete="given-name"
                          type="name"
                          placeholder="Hunter"
                          error={!!errors.firstName?.message}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="lastName" isRequired>
                        Last Name
                      </Label>
                      <FormControl>
                        <TextInput
                          type="name"
                          autoComplete="family-name"
                          placeholder="Biden"
                          error={!!errors.lastName?.message}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email" isRequired>
                      Email
                    </Label>
                    <FormControl>
                      <TextInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        error={!!errors.email?.message}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password" isRequired>
                      Password
                    </Label>
                    <FormControl>
                      <TextInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        error={!!errors.password?.message}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="confirmPassword" isRequired>
                      Confirm Password
                    </Label>
                    <FormControl>
                      <TextInput
                        type="password"
                        placeholder="Confirm your password"
                        autoComplete="current-password"
                        error={!!errors.confirmPassword?.message}
                        valid={
                          form.watch('password') === field.value &&
                          field.value.length >= 8
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="form-actions">
              <Button variant={'primary'} width={'full'}>
                <EnvelopeIcon className="h-4 w-4" /> Continue with Email
              </Button>
            </div>
          </form>
        </Form>
      )}
      {pendingVerification && <VerifyEmailForm />}
    </>
  );
}
