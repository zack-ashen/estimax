import { useSignUp } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '../../Inputs/Button/Button';
import { Label } from '../../Inputs/Label/Label';
import { TextInput } from '../../Inputs/TextInput/TextInput';
import { Form, FormControl, FormField, FormMessage } from '../Base/Form/Form';
import FormItem from '../Base/FormItem/FormItem';

const schema = z.object({
  code: z.string().length(6),
});

type VerifyEmailSchema = z.infer<typeof schema>;

export default function VerifyEmailForm() {
  const { push } = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const form = useForm<VerifyEmailSchema>({
    defaultValues: { code: '' },
    resolver: zodResolver(schema),
  });

  if (!isLoaded) return null;

  const submit = async (data: VerifyEmailSchema) => {
    try {
      const attempt = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (attempt.status === 'complete') {
        await setActive({ session: attempt.createdSessionId });
        push('/auth/onboarding');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="code">Enter code</Label>
              <FormControl>
                <TextInput
                  {...field}
                  id="code"
                  type="text"
                  placeholder="12345"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="form-actions">
          <Button variant="primary" type="submit" width="full">
            Verify Code
          </Button>
        </div>
      </form>
    </Form>
  );
}
