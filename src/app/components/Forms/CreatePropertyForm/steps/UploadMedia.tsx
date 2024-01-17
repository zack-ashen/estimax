import { MediaInput } from '@/app/components/Inputs/MediaInput/MediaInput';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../Base/Form/Form';
import { Step } from '../../Base/forms.types';
import { CreatePropertySchema } from '../CreatePropertyForm';

const MAX_FILE_SIZE = 10000000;
const allowedFileTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/jpg',
  'application/pdf',
];

const UploadMediaElement = () => {
  const {
    setError,
    clearErrors,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<CreatePropertySchema>();

  const handleFilesChange = (fileList: File[]) => {
    let isValid = true;
    const validFiles: File[] = [];

    fileList.forEach((file) => {
      if (!allowedFileTypes.includes(file.type)) {
        setError('media', {
          type: 'manual',
          message: `${file.name}: Invalid file type`,
        });
        isValid = false;
      } else if (file.size > MAX_FILE_SIZE) {
        setError('media', {
          type: 'manual',
          message: `${file.name}: File too large`,
        });
        isValid = false;
      } else {
        validFiles.push(file);
      }
    });

    if (isValid) {
      clearErrors('media');
    }

    setValue('media', validFiles, { shouldValidate: true });
  };

  return (
    <div>
      <FormField
        control={control}
        name="media"
        rules={{
          validate: {
            checkNoErrors: () => {
              return !errors.media || (errors.media.message as string);
            },
            checkFileCount: (files: File[]) => {
              return (
                files.length <= 10 ||
                'You can only upload a maximum of 10 files at a time'
              );
            },
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <MediaInput
                id={'media'}
                label="Upload any PNGs, JPGs, PDFs and media related to this property."
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

const UploadMedia: Step<CreatePropertySchema> = {
  StepElement: <UploadMediaElement />,
  title: 'Upload Media',
  description: 'Add any relevant media related to this property.',
  needsNavButtons: true,
  validateFields: [],
};

export default UploadMedia;
