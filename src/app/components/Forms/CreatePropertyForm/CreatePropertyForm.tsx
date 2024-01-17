'use client';

import useMultiStepForm from '@/app/hooks/useMultiStepForm';
import { clientS3Upload } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';
import { DefaultValues } from 'react-hook-form';
import { z } from 'zod';
import Divider from '../../Divider/Divider';
import { Form } from '../Base/Form/Form';
import FormHeader from '../Base/FormHeader/FormHeader';
import FormNav from '../Base/FormNav/FormNav';
import submit from './actions/submit';
import BasicInfo from './steps/BasicInfo';
import UploadMedia from './steps/UploadMedia';
import VendorSelection from './steps/VendorSelection';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.object({
    value: z.string(),
    label: z.string(),
  }),
  address: z.object({
    value: z.string(),
    label: z.string(),
  }),
  description: z.string().min(1, 'Description is required'),
  media: z.instanceof(File).array(),
});

export type CreatePropertySchema = z.infer<typeof schema>;

const defaultValues: DefaultValues<CreatePropertySchema> = {
  name: '',
  description: '',
  media: [],
};

export default function CreatePropertyForm() {
  const steps = [BasicInfo, UploadMedia, VendorSelection];
  const {
    back,
    next,
    stepPosition,
    isFirstStep,
    isLastStep,
    currentStep: { StepElement, title, description },
    form,
  } = useMultiStepForm<CreatePropertySchema>(steps, schema, defaultValues);
  const { orgSlug, isLoaded } = useAuth();

  const processForm = async (data: CreatePropertySchema) => {
    if (!isLoaded || !orgSlug) {
      // TODO: handle error
      return;
    }

    const mediaKeys =
      data.media.length === 0 ? [] : await clientS3Upload(data.media, orgSlug);

    try {
      await submit({ ...data, media: mediaKeys });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)}>
        <FormHeader title={title} subtitle={description} steps={stepPosition} />
        <Divider className="my-4" />

        {StepElement}

        <FormNav
          className="form-actions"
          submitButtonText={'Finish'}
          isLastStep={isLastStep}
          isFirstStep={isFirstStep}
          useWideButtons={false}
          next={next}
          back={back}
        />
      </form>
    </Form>
  );
}
