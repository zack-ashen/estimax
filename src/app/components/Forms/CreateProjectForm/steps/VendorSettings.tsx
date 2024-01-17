import { Step } from '../../Base/forms.types';
import { CreateProjectSchema } from '../CreateProjectForm';

const VendorSettingsElement = () => {
  return <div>TODO</div>;
};

const VendorSettings: Step<CreateProjectSchema> = {
  title: 'Vendor Settings',
  description:
    'Invite vendors and configure how you want vendors to engage with your project.',
  StepElement: <VendorSettingsElement />,
  validateFields: [],
  needsNavButtons: true,
};

export default VendorSettings;
