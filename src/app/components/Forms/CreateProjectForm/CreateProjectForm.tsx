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
import BiddingSettings from './steps/BiddingSettings';
import UploadMedia from './steps/MediaUpload';
import VendorSettings from './steps/VendorSettings';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  property: z.object({
    value: z.string(),
    label: z.string(),
  }),
  description: z.string().min(1, 'Description is required'),
  media: z.instanceof(File).array(),
  privacy: z.enum(['private', 'public']),
  dynamicBidding: z.enum(['allowed', 'notAllowed']),
  expirationDate: z.date(),
});

export type CreateProjectSchema = z.infer<typeof schema>;

const defaultValues: DefaultValues<CreateProjectSchema> = {
  name: '',
  description: '',
  media: [],
  privacy: 'private',
  dynamicBidding: 'allowed',
  expirationDate: new Date(),
};

export default function CreateProjectForm() {
  const { isLoaded, orgSlug } = useAuth();
  const steps = [BasicInfo, BiddingSettings, UploadMedia, VendorSettings];
  const {
    back,
    next,
    stepPosition,
    isFirstStep,
    isLastStep,
    currentStep: { StepElement, title, description },
    form,
  } = useMultiStepForm<CreateProjectSchema>(steps, schema, defaultValues);

  const processForm = async (data: CreateProjectSchema) => {
    if (!isLoaded || !orgSlug) {
      // TODO: handle error
      return;
    }

    const mediaKeys =
      data.media.length > 0 ? await clientS3Upload(data.media, orgSlug) : [];

    try {
      await submit({ ...data, media: mediaKeys });
    } catch (error) {
      // TODO: handle error
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
