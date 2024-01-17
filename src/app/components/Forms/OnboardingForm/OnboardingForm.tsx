'use client';

import useMultiStepForm from '@/app/hooks/useMultiStepForm';
import { DefaultValues, useForm } from 'react-hook-form';
import { Form } from '../Base/Form/Form';
import MultiFormLayout from '../Base/MultiFormLayout/MultiFormLayout';
import { Step } from '../Base/forms.types';

import { ServicesOptions } from '@/types/common.types';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import z from 'zod';
import onboardPM from './actions/onboardPM';
import onboardVendor from './actions/onboardVendor';
import AccountType from './steps/AccountType';
import RoleInfo from './steps/RoleInfo';

const e164PhoneNumberSchema = z
  .string()
  .min(1, 'Phone number is required.')
  .regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number.');

const UserSchema = z.object({
  phoneNumber: e164PhoneNumberSchema,
});

const VendorSchema = z
  .object({
    role: z.literal('vendor'),
    companyName: z.string().min(1, 'Company name is required.'),
    companyDescription: z.string().min(1, 'Company description is required.'),
    services: z
      .array(z.nativeEnum(ServicesOptions))
      .nonempty('Vendor type is required.'),
    location: z.object({
      value: z.string(),
      label: z.string(),
    }),
  })
  .extend({ ...UserSchema.shape })
  .refine((data) => data.location !== null, {
    message: 'Location is required',
    path: ['location'],
  });

const PropertyManagerSchema = z
  .object({
    role: z.literal('propertyManager'),
    numberOfProperties: z.number().min(0, 'Must be a positive number.'),
    companyName: z.string().min(1, 'Company name is required.'),
  })
  .extend({ ...UserSchema.shape });

const schema = z.union([VendorSchema, PropertyManagerSchema]);

const defaultValues: DefaultValues<OnboardingSchema> = {
  phoneNumber: '',
  companyName: '',
  role: 'propertyManager',
};

export type OnboardingSchema = z.infer<typeof schema>;

export default function OnboardingForm() {
  const { push } = useRouter();
  const { setActive, isLoaded } = useSignUp();
  const steps: Step<OnboardingSchema>[] = [AccountType, RoleInfo];
  const form = useForm<OnboardingSchema>({
    defaultValues,
  });
  const { next, back, currentStep, isFirstStep, isLastStep, stepPosition } =
    useMultiStepForm<OnboardingSchema>(steps, schema, defaultValues);

  if (!isLoaded) return null;

  const submit = async (data: OnboardingSchema) => {
    if (data.role === 'vendor') {
      await onboardVendor(data);
      push('/vendor');
    } else {
      const { cuid } = await onboardPM(data);
      await setActive({ organization: cuid });
      push('/pm');
    }
  };

  const handleOnboardingError = (message: string) => {
    console.error('error: ', message);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <MultiFormLayout<OnboardingSchema>
          currentStep={currentStep}
          submitButtonText="Finish"
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          stepPosition={stepPosition}
          next={next}
          back={back}
          useWideButtons
        />
      </form>
    </Form>
  );
}
