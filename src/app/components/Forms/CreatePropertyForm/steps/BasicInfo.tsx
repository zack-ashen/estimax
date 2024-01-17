import { Label } from '@/app/components/Inputs/Label/Label';
import Select from '@/app/components/Inputs/Select/Base/Select';
import LocationSelect from '@/app/components/Inputs/Select/LocationSelect';
import { TextInput } from '@/app/components/Inputs/TextInput/TextInput';
import { TextArea } from '@/app/components/TextArea/TextArea';
import { PropertyTypes } from '@/types/property.types';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../Base/Form/Form';
import { Step } from '../../Base/forms.types';
import { CreatePropertySchema } from '../CreatePropertyForm';

const BasicInfoElement = () => {
  const form = useFormContext<CreatePropertySchema>();
  const { errors } = form.formState;

  return (
    <div className="form-elements">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="name" isRequired>
              Property Name
            </Label>
            <FormControl>
              <TextInput
                autoComplete="off"
                placeholder="The Lux"
                error={!!errors.name}
                className="w-96"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="type" isRequired>
              Property Type
            </Label>
            <FormControl>
              <Select
                className="w-72"
                options={Object.values(PropertyTypes).map((type) => {
                  return {
                    value: type,
                    label: type,
                  };
                })}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="address" isRequired>
              Address
            </Label>
            <FormControl>
              <LocationSelect
                type={'address'}
                currentOption={field.value}
                className="w-96"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="location" isRequired>
              Description
            </Label>
            <FormControl>
              <TextArea
                placeholder="Description"
                error={!!errors.description}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const BasicInfo: Step<CreatePropertySchema> = {
  StepElement: <BasicInfoElement />,
  title: 'Basic Info',
  description: 'Enter some basic information about your property.',
  needsNavButtons: true,
  validateFields: [],
};

export default BasicInfo;
