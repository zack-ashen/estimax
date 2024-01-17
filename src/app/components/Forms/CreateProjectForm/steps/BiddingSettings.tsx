import { Button } from '@/app/components/Inputs/Button/Button';
import { Calendar } from '@/app/components/Inputs/Calendar/Calendar';
import { Label } from '@/app/components/Inputs/Label/Label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/app/components/Inputs/RadioGroup/RadioGroup';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/Popover/Popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../../Base/Form/Form';
import { Step } from '../../Base/forms.types';
import { CreateProjectSchema } from '../CreateProjectForm';

const BiddingSettingsElement = () => {
  const form = useFormContext<CreateProjectSchema>();

  return (
    <div className="form-elements">
      <FormField
        control={form.control}
        name="dynamicBidding"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="dynamicBidding" isRequired>
              Dynamic Bidding
            </Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="allowed" id="allowed" />
                  <Label htmlFor="allowed" className="font-normal">
                    Allow Dynamic Bidding on this project.
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="notAllowed" id="notAllowed" />
                  <Label htmlFor="notAllowed" className="font-normal">
                    Do not allow Dynamic Bidding on this project.
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="privacy"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="privacy" isRequired>
              Privacy
            </Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="font-normal">
                    Private: Only allow vendors you invite to bid on this
                    project.
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="font-normal">
                    Public: Allow anyone on the platform to bid on this project.
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="expirationDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Label isRequired>Date of birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'secondary'}
                    className={cn(
                      'w-[240px] pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Your date of birth is used to calculate your age.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const BiddingSettings: Step<CreateProjectSchema> = {
  title: 'Bidding Settings',
  description: 'Configure settings for bidding on this project..',
  StepElement: <BiddingSettingsElement />,
  validateFields: [],
  needsNavButtons: true,
};

export default BiddingSettings;
