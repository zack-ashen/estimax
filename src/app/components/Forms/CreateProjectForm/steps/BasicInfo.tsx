import { Label } from '@/app/components/Inputs/Label/Label';
import Select from '@/app/components/Inputs/Select/Base/Select';
import { TextInput } from '@/app/components/Inputs/TextInput/TextInput';
import { TextArea } from '@/app/components/TextArea/TextArea';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../Base/Form/Form';
import { Step } from '../../Base/forms.types';
import { CreateProjectSchema } from '../CreateProjectForm';
import getProperties from '../actions/getProperties';

const BasicInfoElement = () => {
  const form = useFormContext<CreateProjectSchema>();
  const [properties, setProperties] = useState<
    { value: string; label: string }[]
  >([]);
  const searchParams = useSearchParams();
  const property = searchParams.get('property');

  useEffect(() => {
    getProperties().then((properties) => {
      const label = properties.find((p) => p.value === property)?.label;
      if (property && label) {
        form.setValue('property', {
          value: property,
          label: label,
        });
      }
      setProperties(properties);
    });
  }, [form, property]);
  const { errors } = form.formState;

  return (
    <div className="form-elements">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="name" isRequired>
              Project Name
            </Label>
            <FormControl>
              <TextInput
                autoComplete="off"
                placeholder="Window replacement"
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
        name="property"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="property" isRequired>
              Property
            </Label>
            <FormControl>
              <Select
                className="w-72"
                options={properties}
                placeholder="Select the property..."
                id="property"
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
            <Label htmlFor="description" isRequired>
              Description
            </Label>
            <FormControl>
              <TextArea
                placeholder="All the windows in the property need to be replaced...."
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

const BasicInfo: Step<CreateProjectSchema> = {
  title: 'Basic Info',
  description: 'Enter basic information about your project.',
  StepElement: <BasicInfoElement />,
  validateFields: [],
  needsNavButtons: true,
};

export default BasicInfo;
