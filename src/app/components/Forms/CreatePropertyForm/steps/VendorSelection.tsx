import { Step } from '../../Base/forms.types';
import { CreatePropertySchema } from '../CreatePropertyForm';

const VendorSelectionElement = () => {
  return (
    <div>
      <h1 className="font-semibold">TODO</h1>
    </div>
  );
};

const VendorSelection: Step<CreatePropertySchema> = {
  StepElement: <VendorSelectionElement />,
  title: 'Add Vendors',
  description: 'Add your favorite vendors to save for later for this property.',
  needsNavButtons: true,
  validateFields: [],
};

export default VendorSelection;
