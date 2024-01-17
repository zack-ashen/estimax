import { Label } from '@/app/components/Inputs/Label/Label';
import Select from '@/app/components/Inputs/Select/Base/Select';
import LocationSelect from '@/app/components/Inputs/Select/LocationSelect';
import { TextInput } from '@/app/components/Inputs/TextInput/TextInput';
import { ServicesOptions } from '@/types/common.types';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../Base/Form/Form';
import { Step } from '../../Base/forms.types';
import { OnboardingSchema } from '../OnboardingForm';

const RoleInfoElement = () => {
  const form = useFormContext<OnboardingSchema>();
  const {
    formState: { errors },
  } = form;
  const roleType = form.watch('role');

  const VendorInfoElement = (
    <>
      <FormField
        control={form.control}
        name="services"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="services" isRequired>
              Services Offered
            </Label>
            <FormControl>
              <Select
                options={Object.values(ServicesOptions).map((service) => ({
                  value: service,
                  label: service,
                }))}
                id="business-type"
                currentOption={field.value}
                {...field}
                isMulti
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="location" isRequired>
              Location
            </Label>
            <FormControl>
              <LocationSelect
                type={'cities'}
                currentOption={field.value}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  return (
    <>
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="phoneNumber" isRequired>
              Phone Number
            </Label>
            <FormControl>
              <TextInput
                type="tel"
                placeholder="+1 347-277-1442"
                autoComplete="tel"
                error={!!errors.phoneNumber?.message}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="companyName" isRequired>
              Company Name
            </Label>
            <FormControl>
              <TextInput
                placeholder="CMS Partners"
                error={!!errors.companyName?.message}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {roleType === 'vendor' ? VendorInfoElement : <></>}
    </>
  );
};

const RoleInfo: Step<OnboardingSchema> = {
  StepElement: <RoleInfoElement />,
  title: 'Business Info',
  description: 'Tell us about your business.',
  needsNavButtons: true,
  validateFields: [
    'role',
    'phoneNumber',
    'companyName',
    'location',
    'services',
  ],
};

export default RoleInfo;
