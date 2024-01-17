'use client';

import CardRadio from '@/app/components/Inputs/RadioGroup/RadioGroup';
import { BuildingIcon, ToolIcon } from '@/assets';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../Base/Form/Form';
import { Step } from '../../Base/forms.types';
import { OnboardingSchema } from '../OnboardingForm';

const AccountTypeElement = () => {
  const form = useFormContext<OnboardingSchema>();
  const [selectedValue, setSelectedValue] = useState('homeowner');

  const options = [
    {
      value: 'propertyManager',
      label: 'Property Manager',
      Icon: <BuildingIcon className="h-4 w-4" />,
    },
    {
      value: 'vendor',
      label: 'Vendor',
      Icon: <ToolIcon className="h-4 w-4" />,
    },
  ];

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="form-elements">
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <CardRadio options={options} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const AccountType: Step<OnboardingSchema> = {
  StepElement: <AccountTypeElement />,
  title: 'Account Type',
  description: 'What type of Estimax user are you?',
  needsNavButtons: true,
  validateFields: [],
};

export default AccountType;
